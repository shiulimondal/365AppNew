import reportIcon from '../assets/images/report.png';
import trafficIcon from '../assets/images/traffic.png';
import civilIcon from '../assets/images/civil.png';
import lawsuitsIcon from '../assets/images/lawsuits.png';
import liensIcon from '../assets/images/liens.png';
import phoneliIcon from '../assets/images/phoneli.png';
import criminaldatabaseIcon from '../assets/images/criminal-database.png';
import bankruptIcon from '../assets/images/bankrupt.png';


export const dataDetails = [
    {
        icon: reportIcon,
        Dtitle: 'Arrest Reports',
        subTitle: 'Discover if individuals have ever been arrested through our comprehensive public records search.',
    },
    {
        icon: trafficIcon,
        Dtitle: 'Traffic Reports',
        subTitle: 'Access information on collisions, traffic violations, DUIs, and speeding tickets for individuals under scrutiny.',
    },
    {
        icon: civilIcon,
        Dtitle: 'Civil Records',
        subTitle: "Examine non-criminal court cases, such as child custody disputes, personal injury claims, or restraining orders, to gain insights into individuals' legal interactions.",
    },
    {
        icon: lawsuitsIcon,
        Dtitle: 'Lawsuits',
        subTitle: 'Public records encompass filed lawsuits and legal actions involving individuals, providing insight into their legal history.',
    },
    {
        icon: liensIcon,
        Dtitle: 'Liens',
        subTitle: 'When individuals fail to pay their debts, their property may be temporarily seized through a lien until the debts are resolved. This information is essential for understanding financial responsibility.',
    },
    {
        icon: phoneliIcon,
        Dtitle: 'Phone Listings',
        subTitle: 'Our online public records search makes it easy to locate individuals by name or phone number, eliminating the need for outdated phone book searches.',
    },
    {
        icon: criminaldatabaseIcon,
        Dtitle: 'Criminal Records',
        subTitle: 'Reveal convictions and charges against individuals to help make informed decisions about personal and professional interactions.',
    },
    {
        icon: bankruptIcon,
        Dtitle: 'Bankruptcies',
        subTitle: 'Bankruptcies are crucial for business partnerships and relationships, as this information discloses past financial difficulties and promotes transparency.',
    },
];

export const ageOptions = [
    { name: '18-25', id: '18-25' },
    { name: '26-39', id: '26-39' },
    { name: '40-49', id: '40-49' },
    { name: '50-59', id: '50-59' },
    { name: '60+', id: '60' },
];

export const stateOptions = [
    { name: 'Alabama', id: 'Alabama, AL' },
    { name: 'Alaska', id: 'Alaska, AK' },
    { name: 'Arizona', id: 'Arizona, AZ' },
    { name: 'Arkansas', id: 'Arkansas, AR' },
    { name: 'California', id: 'California, CA' },
    { name: 'Colorado', id: 'Colorado, CO' },
    { name: 'Connecticut', id: 'Connecticut, CT' },
    { name: 'Delaware', id: 'Delaware, DE' },
    { name: 'Florida', id: 'Florida, FL' },
    { name: 'Georgia', id: 'Georgia, GA' },
    { name: 'Hawaii', id: 'Hawaii, HI' },
    { name: 'Idaho', id: 'Idaho, ID' },
    { name: 'Illinois', id: 'Illinois, IL' },
    { name: 'Indiana', id: 'Indiana, IN' },
    { name: 'Iowa', id: 'Iowa, IA' },
    { name: 'Kansas', id: 'Kansas, KS' },
    { name: 'Kentucky', id: 'Kentucky, KY' },
    { name: 'Louisiana', id: 'Louisiana, LA' },
    { name: 'Maine', id: 'Maine, ME' },
    { name: 'Maryland', id: 'Maryland, MD' },
    { name: 'Massachusetts', id: 'Massachusetts, MA' },
    { name: 'Michigan', id: 'Michigan, MI' },
    { name: 'Minnesota', id: 'Minnesota, MN' },
    { name: 'Mississippi', id: 'Mississippi, MS' },
    { name: 'Missouri', id: 'Missouri, MO' },
    { name: 'Montana', id: 'Montana, MT' },
    { name: 'Nebraska', id: 'Nebraska, NE' },
    { name: 'Nevada', id: 'Nevada, NV' },
    { name: 'New Hampshire', id: 'New Hampshire, NH' },
    { name: 'New Jersey', id: 'New Jersey, NJ' },
    { name: 'New Mexico', id: 'New Mexico, NM' },
    { name: 'New York', id: 'New York, NY' },
    { name: 'North Carolina', id: 'North Carolina, NC' },
    { name: 'North Dakota', id: 'North Dakota, ND' },
    { name: 'Ohio', id: 'Ohio, OH' },
    { name: 'Oklahoma', id: 'Oklahoma, OK' },
    { name: 'Oregon', id: 'Oregon, OR' },
    { name: 'Pennsylvania', id: 'Pennsylvania, PA' },
    { name: 'Rhode Island', id: 'Rhode Island, RI' },
    { name: 'South Carolina', id: 'South Carolina, SC' },
    { name: 'South Dakota', id: 'South Dakota, SD' },
    { name: 'Tennessee', id: 'Tennessee, TN' },
    { name: 'Texas', id: 'Texas, TX' },
    { name: 'Utah', id: 'Utah, UT' },
    { name: 'Vermont', id: 'Vermont, VT' },
    { name: 'Virginia', id: 'Virginia, VA' },
    { name: 'Washington', id: 'Washington, WA' },
    { name: 'West Virginia', id: 'West Virginia, WV' },
    { name: 'Wisconsin', id: 'Wisconsin, WI' },
    { name: 'Wyoming', id: 'Wyoming, WY' },
];

export const planData = [
    {
        title: 'Basic',
        price: '11.95',
        popular: false,
        features: [
            { name: 'Name and aliases', available: true },
            { name: 'Age and DOB', available: true },
            { name: 'Address History', available: true },
            { name: 'Email Address History', available: true },
            { name: 'Phone Numbers', available: false },
            { name: 'Relatives and Associates', available: false },
            { name: 'Business History', available: false },
            { name: 'Workplace History', available: false },
            { name: 'Criminal History', available: false },
            { name: 'Forclosure History', available: false },
            { name: 'Property Records', available: false },
            { name: 'Domain Records', available: false },
            { name: 'Eviction Records', available: false },
            { name: 'Debt Records', available: false },
        ],
    },
    {
        title: 'Standard',
        price: '14.95',
        popular: true,
        features: [
            { name: 'Name and aliases', available: true },
            { name: 'Age and DOB', available: true },
            { name: 'Address History', available: true },
            { name: 'Email Address History', available: true },
            { name: 'Phone Numbers', available: true },
            { name: 'Relatives and Associates', available: true },
            { name: 'Business History', available: false },
            { name: 'Workplace History', available: false },
            { name: 'Criminal History', available: false },
            { name: 'Forclosure History', available: false },
            { name: 'Property Records', available: false },
            { name: 'Domain Records', available: false },
            { name: 'Eviction Records', available: false },
            { name: 'Debt Records', available: false },
        ],
    },
    {
        title: 'Premium',
        price: '18.95',
        popular: false,
        features: [
            { name: 'Name and aliases', available: true },
            { name: 'Age and DOB', available: true },
            { name: 'Address History', available: true },
            { name: 'Email Address History', available: true },
            { name: 'Phone Numbers', available: true },
            { name: 'Relatives and Associates', available: true },
            { name: 'Business History', available: true },
            { name: 'Workplace History', available: true },
            { name: 'Criminal History', available: true },
            { name: 'Forclosure History', available: true },
            { name: 'Property Records', available: true },
            { name: 'Domain Records', available: true },
            { name: 'Eviction Records', available: true },
            { name: 'Debt Records', available: true },
        ],
    },
];

export const months = [
    { name: 'January', id: '1' },
    { name: 'February', id: '2' },
    { name: 'March', id: '3' },
    { name: 'April', id: '4' },
    { name: 'May', id: '5' },
    { name: 'June', id: '6' },
    { name: 'July', id: '7' },
    { name: 'August', id: '6' },
    { name: 'September', id: '9' },
    { name: 'October', id: '10' },
    { name: 'November', id: '11' },
    { name: 'February', id: '12' },

];

export const Industry = [
    { name: 'Collections', id: 'Collections' },
    { name: 'Insurance', id: 'Insurance' },
    { name: 'Investigations', id: 'Investigations' },
    { name: 'Legal', id: 'Legal' },
    { name: 'Real Estate', id: 'Real Estate' },
    { name: 'Marketing', id: 'Marketing' },
    { name: 'Other', id: 'Other' }
];

export const accountType = [
    { name: 'Personal', id: 'Personal' },
    { name: 'Business', id: 'Business' },
];

export const Learnmore = [
    {
        title: 'Streamlined Search Process',
        sub: "At 365 Instant Check, we prioritize ease and efficiency. To start a search, simply enter the person's first and last name—nothing else is required. For more common names like John Smith, adding extra details such as their city and state of residence can significantly improve the accuracy of your results. These additional pieces of information help narrow down the search, ensuring that you receive more precise and relevant results."
    },
    {
        title: 'Effortless People Search Made Easy',
        sub: "Looking for someone but unsure where to start? Whether you need information about yourself or someone else, navigating public records can be overwhelming. At 365 Instant Check, we simplify the process, turning complex searches into quick, straightforward tasks. Our advanced people search is designed to be fast and hassle-free, so you can find what you need without the frustration."
    },
    {
        title: 'Secure Your Peace of Mind with 365 Instant Check',
        sub: "In a world where safety and peace of mind are crucial, our online people finder is a trusted tool for thousands. Whether you're reconnecting with an old friend, finding a relative, or vetting a potential roommate or date, our criminal record checks provide reassurance of a clean background. Our advanced algorithms also ensure secure transactions by verifying the identities of buyers and sellers, helping you avoid costly mistakes.While many people search services fall short, 365 Instant Check excels. We offer reliable, accurate results without the hassle or high costs often associated with public records. Say goodbye to sifting through phone books, visiting courthouses, or endless online searches. Our intuitive platform provides a comprehensive solution, making it easy to find anyone with just a few clicks."
    }

];

export const reports = [
    { name: 'Full Names' },
    { name: 'Phone Numbers' },
    { name: 'Current and Prior Addresses' },
    { name: 'E-mail Addresses' },
    { name: 'Aliases' },
    { name: 'Criminal Records' },
    { name: 'Sexual Offender Records' },
    { name: 'Traffic Records' },
    { name: 'Business Records' },
    { name: 'Workplace Records' },
    { name: 'Foreclosure Records' },
    { name: ' Relatives & Associates' },
];
