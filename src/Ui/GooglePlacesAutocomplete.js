import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { apiKey } from '../Utils/apiKey';
import { moderateScale } from '../Constants/PixelRatio';
import { FONTS } from '../Constants/Fonts';

const GOOGLE_API_KEY = apiKey;

const GooglePlacesAutocomplete = ({ onSelect, placeholder, country = 'us' }) => {
    const [input, setInput] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const shouldFetch = useRef(true);

    useEffect(() => {
        const fetchPredictions = async () => {
            if (!input.trim() || !shouldFetch.current) {
                setPredictions([]);
                return;
            }

            setLoading(true);
            try {
                const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                    input
                )}&key=${GOOGLE_API_KEY}&types=address&components=country:${country}`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.status === 'OK') {
                    setPredictions(data.predictions);
                } else {
                    setPredictions([]);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setPredictions([]);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(fetchPredictions, 300);
        return () => clearTimeout(timeout);
    }, [input]);

    const getFormattedAddress = (components) => {
        const get = (type) =>
            components.find((c) => c.types.includes(type))?.long_name || '';
        const getShort = (type) =>
            components.find((c) => c.types.includes(type))?.short_name || '';

        const streetNumber = get('street_number');
        const route = get('route');
        const city =
            get('locality') ||
            get('sublocality') ||
            get('administrative_area_level_2');
        const stateShort = getShort('administrative_area_level_1');

        return `${streetNumber} ${route}, ${city}, ${stateShort}`;
    };

    const handleSelect = async (item) => {
        shouldFetch.current = false;
        setPredictions([]);

        try {
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${GOOGLE_API_KEY}`;
            const res = await fetch(detailsUrl);
            const json = await res.json();

            if (json.status === 'OK') {
                const components = json.result.address_components;
                const formatted = getFormattedAddress(components);

                setInput(formatted);
                onSelect({ ...item, formatted_address: formatted });
            } else {
                const fallback = item.description.replace(/,?\s*USA$/, '');
                setInput(fallback);
                onSelect({ ...item, formatted_address: fallback });
            }
        } catch (err) {
            console.error('Place details fetch error:', err);
            const fallback = item.description.replace(/,?\s*USA$/, '');
            setInput(fallback);
            onSelect({ ...item, formatted_address: fallback });
        } finally {
            setTimeout(() => {
                shouldFetch.current = true;
            }, 500);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={input}
                onChangeText={(text) => {
                    shouldFetch.current = true;
                    setInput(text);
                }}
                placeholder={placeholder || 'Search location'}
                style={styles.input}
            />
            {loading && <ActivityIndicator style={{ marginTop: 5 }} />}
            {predictions.length > 0 && (
                <FlatList
                    data={predictions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => handleSelect(item)}
                        >
                            {/* Show full suggestion in dropdown */}
                            <Text>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.list}
                    keyboardShouldPersistTaps="handled"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // height: moderateScale(40)
    },
    input: {
        backgroundColor: '#fff',
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
        borderRadius: moderateScale(20),
        width: moderateScale(290)
    },
    list: {
        maxHeight: moderateScale(250),
        marginTop: moderateScale(5),
        backgroundColor: '#fff',
        borderRadius: moderateScale(8),
    },
    item: {
        padding: moderateScale(10),
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default GooglePlacesAutocomplete;
