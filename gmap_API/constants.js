var DEFAULT_GEOLOCATION_ZOOM = 12;

var GEOCODER_STATUS_DESCRIPTION = {
  OK: 'The request did not encounter any errors',
  UNKNOWN_ERROR: 'The request could not be successfully processed, yet the ' +
                 'exact reason for the failure is not known',
  OVER_QUERY_LIMIT: 'The webpage has gone over the requests limit in too ' +
                    'short a time',
  REQUEST_DENIED: 'The webpage is not allowed to use the geocoder for some ' +
                  'reason',
  INVALID_REQUEST: 'This request was invalid',
  ZERO_RESULTS: 'The request did not encounter any errors, but returned no ' +
                'results',
  ERROR: 'There was a problem contacting the Google servers'
};

var GEOCODER_LOCATION_TYPE_DESCRIPTION = {
  ROOFTOP: 'The returned result reflects a precise geocode',
  RANGE_INTERPOLATED: 'The returned result reflects an approximation ' +
                      '(usually on a road) interpolated between two precise ' +
                      'points (such as intersections). Interpolated results ' +
                      'are generally returned when rooftop geocodes are ' +
                      'unavailable for a street address.',
  GEOMETRIC_CENTER: 'The returned result is the geometric center of a result ' +
                    'such a line (e.g. street) or polygon (region).',
  APPROXIMATE: 'The returned result is approximate.'
};

var GREEN_X_SYMBOL = {
    path: 'M -2,-2 2,2 M 2,-2 -2,2',
    scale: 5,
    strokeColor: '#0F9D58',
    strokeWeight: 2
};

// Add 50px to ensure markers within a viewport are visible when this viewport
// is expanded to fit in the map space left by Search and Result panels.
var PADDING_FOR_MARKERS = 50;

// Base path for lettered marker.
var LETTERED_ICON_BASENAME = '/maps/documentation/utils/geocoder/images/marker';

var ISO3166_COUNTRY_CODE = {
  AF: 'Afghanistan',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua And Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  AX: '�land Islands',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BQ: 'Bonaire',
  BA: 'Bosnia And Herzegowina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: 'Cote D\'ivoire',
  HR: 'Croatia (Hrvatska)',
  CU: 'Cuba',
  CW: 'Cura癟ao',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibo Uti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (Malvinas)',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  RN: 'Gue',
  GN: 'Guinea',
  GW: 'Guinea-bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard And Mc Donald Islands',
  VA: 'Vatican City',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran (Islamic Republic Of)',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle Of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KP: 'Korea',
  KR: 'Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: 'Laos People\'s Democratic Republic',
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libya ',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MK: 'Macedonia',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestine',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  SH: 'Saint Helena',
  BL: 'Saint Barth矇lemy',
  KN: 'Saint Kitts And Nevis',
  LC: 'Saint Lucia',
  PM: 'Saint Pierre And Miquelon',
  VC: 'Saint Vincent And The Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome And Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SX: 'Sint Maarten (Dutch Part)',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia And The South Sandwich Islands',
  SS: 'South Sudan',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard And Jan Mayen Islands',
  SZ: 'Swaziland',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad And Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks And Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UM: 'United States Minor Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VG: 'Virgin Islands (British)',
  VI: 'Virgin Islands (U.S.)',
  WF: 'Wallis And Futuna Islands',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe'
};

// These address components are primary in the sense that all/most other types
// for a given address component can be derived from these ones, e.g. locality
// implies political. The order in this list matters, because some types are
// primary iff others are not present, e.g. locality is primary iff
// colloquial_area is not present.
var PRIMARY_ADDRESS_COMPONENT_TYPES = ['airport',
                                       'administrative_area_level_1',
                                       'administrative_area_level_2',
                                       'administrative_area_level_3',
                                       'administrative_area_level_4',
                                       'administrative_area_level_5',
                                       'bus_station',
                                       'colloquial_area',
                                       'country',
                                       'intersection',
                                       'floor',
                                       'ward',
                                       'locality',
                                       'route',
                                       'natural_feature',
                                       'neighborhood',
                                       'park',
                                       'parking',
                                       'point_of_interest',
                                       'post_box',
                                       'postal_code_prefix',
                                       'postal_code_suffix',
                                       'postal_code',
                                       'postal_town',
                                       'premise',
                                       'room',
                                       'street_number',
                                       'sublocality_level_1',
                                       'sublocality_level_2',
                                       'sublocality_level_3',
                                       'sublocality_level_4',
                                       'sublocality_level_5',
                                       'sublocality',
                                       'subpremise',
                                       'train_station',
                                       'transit_station',
                                       'establishment',
                                       'political'];