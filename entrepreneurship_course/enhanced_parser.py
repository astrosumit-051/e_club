#!/usr/bin/env python3
import json
import re
import os
from pathlib import Path

# State abbreviation mapping
STATE_MAPPING = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
}

def load_json_file(filepath):
    """Load JSON file and return data"""
    with open(filepath, 'r') as f:
        return json.load(f)

def save_json_file(filepath, data):
    """Save data to JSON file"""
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

def extract_funding_amount(text):
    """Extract funding amounts from text"""
    # Look for dollar amounts
    amount_patterns = [
        r'\$[\d,]+[KMB]?(?:\s*-\s*\$[\d,]+[KMB]?)?',
        r'\$[\d,]+(?:,\d{3})*(?:\s*-\s*\$[\d,]+(?:,\d{3})*)?',
        r'up to \$[\d,]+[KMB]?',
        r'from \$[\d,]+[KMB]? to \$[\d,]+[KMB]?'
    ]
    
    for pattern in amount_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(0)
    return None

def parse_state_resources():
    """Parse all research files and extract state-specific resources"""
    
    # Load existing JSON
    json_file = '/home/ubuntu/entrepreneurship_course/us_resources_by_state.json'
    data = load_json_file(json_file)
    
    # Define state-specific resources based on research
    state_resources = {
        'AL': {
            'funding': [
                {
                    'name': 'Innovate Alabama - LendAL Program',
                    'description': 'State Small Business Credit Initiative providing loans through Collateral Support, Loan Guaranty, and Loan Participation programs',
                    'website': 'https://innovatealabama.org',
                    'type': 'State Loan Program',
                    'eligibility_criteria': 'Alabama small businesses',
                    'application_deadline': 'Ongoing',
                    'funding_amount': '$10,000 - $5,000,000',
                    'contact_info': 'Innovate Alabama'
                },
                {
                    'name': 'Innovate Alabama - InvestAL Program',
                    'description': 'Equity investment program for startups and venture capital funds',
                    'website': 'https://innovatealabama.org',
                    'type': 'Equity Investment',
                    'eligibility_criteria': 'Alabama startups and VCs, requires 1:1 private match',
                    'application_deadline': 'Ongoing',
                    'funding_amount': '$5,000 - $1,000,000 for startups, $500,000 - $2,000,000 for VCs',
                    'contact_info': 'Innovate Alabama'
                },
                {
                    'name': 'Alabama Launchpad',
                    'description': 'Startup competition and funding program',
                    'website': 'https://alabamalaunchpad.com',
                    'type': 'Competition/Grant',
                    'eligibility_criteria': 'Alabama-based startups',
                    'application_deadline': 'Annual competition',
                    'funding_amount': 'Varies',
                    'contact_info': 'Alabama Launchpad'
                }
            ],
            'educational_programs': [
                {
                    'name': 'Alabama Small Business Development Center (ASBDC)',
                    'description': 'Free business consulting and technical assistance',
                    'website': 'https://asbdc.org',
                    'type': 'SBDC',
                    'eligibility_criteria': 'Small businesses and entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Free services',
                    'contact_info': 'ASBDC offices statewide'
                }
            ]
        },
        'AK': {
            'educational_programs': [
                {
                    'name': 'Alaska Small Business Development Center',
                    'description': 'Free, confidential business advising, workshops, and market research',
                    'website': 'https://aksbdc.org',
                    'type': 'SBDC',
                    'eligibility_criteria': 'Alaska small businesses and entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Free services',
                    'contact_info': 'Wasilla: 907-373-7232, Anchorage: 907-786-7201'
                },
                {
                    'name': 'Small Business Assistance Center (SBAC)',
                    'description': 'Comprehensive guidance on state/federal loan programs, marketing, export support, procurement, and regulatory compliance',
                    'website': 'https://www.commerce.alaska.gov/web/ded/dev/businessassistance.aspx',
                    'type': 'State Business Assistance',
                    'eligibility_criteria': 'Alaska businesses',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Free services',
                    'contact_info': 'Alaska Department of Commerce'
                }
            ],
            'funding': [
                {
                    'name': 'Alaska Industrial Development and Export Authority (AIDEA)',
                    'description': 'State financing authority providing loans and development programs',
                    'website': 'https://www.aidea.org',
                    'type': 'State Development Authority',
                    'eligibility_criteria': 'Alaska businesses and development projects',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Varies by program',
                    'contact_info': 'AIDEA offices'
                }
            ]
        },
        'CT': {
            'funding': [
                {
                    'name': 'Connecticut Small Business Boost Fund',
                    'description': 'State loan program for small businesses',
                    'website': 'https://portal.ct.gov/decd',
                    'type': 'State Loan Program',
                    'eligibility_criteria': 'Businesses with <$8M revenue and <100 employees',
                    'application_deadline': 'Ongoing',
                    'funding_amount': '$5,000 - $500,000',
                    'contact_info': 'Connecticut Department of Economic and Community Development'
                },
                {
                    'name': 'Connecticut Innovations Pre-Seed Fund',
                    'description': 'Early-stage funding for Connecticut startups',
                    'website': 'https://ctinnovations.com',
                    'type': 'Pre-Seed Investment',
                    'eligibility_criteria': 'Connecticut-based early-stage companies',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Up to $150,000',
                    'contact_info': 'Connecticut Innovations'
                },
                {
                    'name': 'Manufacturing Innovation Fund',
                    'description': 'State fund supporting manufacturing innovation',
                    'website': 'https://ctinnovations.com',
                    'type': 'Innovation Fund',
                    'eligibility_criteria': 'Connecticut manufacturing companies',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Part of $75M fund',
                    'contact_info': 'Connecticut Innovations'
                }
            ],
            'educational_programs': [
                {
                    'name': 'Connecticut Small Business Development Center',
                    'description': 'Free business consulting and training',
                    'website': 'https://ctsbdc.com',
                    'type': 'SBDC',
                    'eligibility_criteria': 'Connecticut small businesses',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Free services',
                    'contact_info': 'CTSBDC offices statewide'
                }
            ]
        },
        'DE': {
            'funding': [
                {
                    'name': 'Delaware EDGE Grant Program',
                    'description': 'Competitive grants for early-stage businesses',
                    'website': 'https://business.delaware.gov',
                    'type': 'State Grant',
                    'eligibility_criteria': 'Businesses <7 years old with <10 employees',
                    'application_deadline': 'Competitive rounds',
                    'funding_amount': '$25,000 - $100,000',
                    'contact_info': 'Delaware Division of Small Business'
                },
                {
                    'name': 'Startup302 Pitch Competition',
                    'description': 'Pitch competition for underrepresented founders',
                    'website': 'https://startup302.com',
                    'type': 'Competition',
                    'eligibility_criteria': 'Underrepresented founders in Delaware',
                    'application_deadline': 'Annual competition',
                    'funding_amount': '$3,000 - $25,000',
                    'contact_info': 'Startup302'
                }
            ],
            'incubators': [
                {
                    'name': 'Delaware Technology Park',
                    'description': 'Innovation hub offering lab space and resources',
                    'website': 'https://delawaretechnologypark.com',
                    'type': 'Technology Park',
                    'eligibility_criteria': 'Technology companies',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Space rental and services',
                    'contact_info': 'Delaware Technology Park'
                },
                {
                    'name': 'Innovation Space',
                    'description': 'Co-working and innovation space',
                    'website': 'https://innovationspaceDE.com',
                    'type': 'Innovation Space',
                    'eligibility_criteria': 'Entrepreneurs and startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Membership fees',
                    'contact_info': 'Innovation Space Delaware'
                }
            ]
        },
        'ID': {
            'funding': [
                {
                    'name': 'Idaho Revolving Loan Fund',
                    'description': 'State-backed loan program for Idaho businesses',
                    'website': 'https://commerce.idaho.gov',
                    'type': 'State Loan Program',
                    'eligibility_criteria': 'Idaho businesses',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Varies',
                    'contact_info': 'Idaho Department of Commerce'
                },
                {
                    'name': 'Idaho Microloan Program',
                    'description': 'Small loans for Idaho startups and small businesses',
                    'website': 'https://commerce.idaho.gov',
                    'type': 'Microloan Program',
                    'eligibility_criteria': 'Idaho small businesses',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Small loans',
                    'contact_info': 'Idaho Department of Commerce'
                }
            ],
            'startup_communities': [
                {
                    'name': 'Trailhead Boise',
                    'description': 'Startup community and co-working space',
                    'website': 'https://trailheadboise.org',
                    'type': 'Startup Community',
                    'eligibility_criteria': 'Entrepreneurs and startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Membership fees',
                    'contact_info': 'Trailhead Boise'
                }
            ]
        },
        'IL': {
            'educational_programs': [
                {
                    'name': 'Chicago BACP Entrepreneur Certificate Program',
                    'description': 'Free entrepreneur certification program',
                    'website': 'https://chicago.gov/BACPWebinars',
                    'type': 'Certificate Program',
                    'eligibility_criteria': 'Chicago entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Free program',
                    'contact_info': 'Chicago Department of Business Affairs and Consumer Protection'
                },
                {
                    'name': 'UIC Institute for Entrepreneurial Studies',
                    'description': 'University entrepreneurship program and BS degree',
                    'website': 'https://business.uic.edu/entrepreneurship',
                    'type': 'University Program',
                    'eligibility_criteria': 'UIC students and community',
                    'application_deadline': 'Academic calendar',
                    'funding_amount': 'Tuition-based',
                    'contact_info': 'University of Illinois Chicago'
                },
                {
                    'name': 'DePaul Coleman Entrepreneurship Center',
                    'description': 'University entrepreneurship center with academic and practical training',
                    'website': 'https://business.depaul.edu/centers-and-institutes/coleman-entrepreneurship-center',
                    'type': 'University Center',
                    'eligibility_criteria': 'DePaul students and community',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Various programs',
                    'contact_info': 'DePaul University'
                }
            ],
            'funding': [
                {
                    'name': 'CIBC Bank USA Entrepreneur Loan Program',
                    'description': 'Loan program for BACP certificate graduates',
                    'website': 'https://us.cibc.com',
                    'type': 'Bank Loan Program',
                    'eligibility_criteria': 'BACP Entrepreneur Certificate graduates',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Varies',
                    'contact_info': 'CIBC Bank USA'
                }
            ]
        },
        'KY': {
            'funding': [
                {
                    'name': 'KY Innovation SBIR-STTR Matching Funds',
                    'description': 'State matching funds for federal SBIR/STTR awards',
                    'website': 'https://kyinnovation.com',
                    'type': 'Matching Fund',
                    'eligibility_criteria': 'Kentucky companies with SBIR/STTR awards',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Matches federal awards',
                    'contact_info': 'KY Innovation'
                },
                {
                    'name': 'Commonwealth Seed Capital',
                    'description': 'Early-stage funding for high-tech startups',
                    'website': 'https://kyinnovation.com',
                    'type': 'Seed Capital',
                    'eligibility_criteria': 'Kentucky high-tech startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Varies',
                    'contact_info': 'KY Innovation'
                },
                {
                    'name': 'Kentucky Angel Investment Tax Credit',
                    'description': 'Tax credit for angel investors',
                    'website': 'https://ced.ky.gov',
                    'type': 'Tax Credit',
                    'eligibility_criteria': 'Qualified angel investors',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Tax credit incentive',
                    'contact_info': 'Kentucky Cabinet for Economic Development'
                }
            ]
        },
        'LA': {
            'funding': [
                {
                    'name': 'Louisiana Digital Interactive Media Tax Credit',
                    'description': 'Tax credit for digital media companies',
                    'website': 'https://opportunitylouisiana.gov',
                    'type': 'Tax Credit',
                    'eligibility_criteria': 'Digital media companies in Louisiana',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Tax credit incentive',
                    'contact_info': 'Louisiana Economic Development'
                }
            ],
            'accelerators': [
                {
                    'name': 'Nexus Louisiana Ignition Accelerator',
                    'description': 'Startup accelerator program',
                    'website': 'https://nexusla.org',
                    'type': 'Accelerator',
                    'eligibility_criteria': 'Louisiana startups',
                    'application_deadline': 'Cohort-based',
                    'funding_amount': 'Varies',
                    'contact_info': 'Nexus Louisiana'
                }
            ],
            'educational_programs': [
                {
                    'name': 'Louisiana Small Business Development Center',
                    'description': 'No-cost business consultations, training, and guides',
                    'website': 'https://lsbdc.org',
                    'type': 'SBDC',
                    'eligibility_criteria': 'Louisiana small businesses',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Free services',
                    'contact_info': 'LSBDC offices statewide'
                }
            ]
        },
        'MN': {
            'funding': [
                {
                    'name': 'Minnesota Angel Tax Credit',
                    'description': 'Tax credit for angel investors in Minnesota startups',
                    'website': 'https://mn.gov/deed',
                    'type': 'Tax Credit',
                    'eligibility_criteria': 'Qualified angel investors',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Tax credit incentive',
                    'contact_info': 'Minnesota Department of Employment and Economic Development'
                }
            ],
            'startup_communities': [
                {
                    'name': 'Launch Minnesota',
                    'description': 'State initiative supporting startup ecosystem',
                    'website': 'https://launchminnesota.org',
                    'type': 'State Initiative',
                    'eligibility_criteria': 'Minnesota startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Various programs',
                    'contact_info': 'Launch Minnesota'
                },
                {
                    'name': 'BETA.MN',
                    'description': 'Nonprofit supporting Twin Cities startup community',
                    'website': 'https://beta.mn',
                    'type': 'Nonprofit Organization',
                    'eligibility_criteria': 'Twin Cities entrepreneurs',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Community programs',
                    'contact_info': 'BETA.MN'
                }
            ]
        },
        'MS': {
            'educational_programs': [
                {
                    'name': 'Mississippi Small Business Development Center Network',
                    'description': 'Confidential counseling, business planning, training, and disaster readiness',
                    'website': 'https://mssbdc.org',
                    'type': 'SBDC Network',
                    'eligibility_criteria': 'Mississippi small businesses',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Free services',
                    'contact_info': 'MS-SBDC offices statewide'
                }
            ]
        },
        'MO': {
            'funding': [
                {
                    'name': 'Arch Grants',
                    'description': 'Equity-free grants for startups relocating to St. Louis',
                    'website': 'https://archgrants.org',
                    'type': 'Equity-Free Grant',
                    'eligibility_criteria': 'Startups willing to relocate to St. Louis',
                    'application_deadline': 'Annual competition',
                    'funding_amount': '$50,000 equity-free',
                    'contact_info': 'Arch Grants'
                },
                {
                    'name': 'LaunchKC',
                    'description': 'Grant program for Kansas City startups',
                    'website': 'https://launchkc.org',
                    'type': 'Grant Program',
                    'eligibility_criteria': 'Kansas City area startups',
                    'application_deadline': 'Annual competition',
                    'funding_amount': 'Up to $50,000',
                    'contact_info': 'LaunchKC'
                },
                {
                    'name': 'Digital Sandbox KC',
                    'description': 'Project funding for Kansas City tech startups',
                    'website': 'https://digitalsandboxkc.com',
                    'type': 'Project Funding',
                    'eligibility_criteria': 'Kansas City tech startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Project-based funding',
                    'contact_info': 'Digital Sandbox KC'
                }
            ],
            'incubators': [
                {
                    'name': 'Cortex Innovation Community',
                    'description': 'Innovation district and startup community in St. Louis',
                    'website': 'https://cortexstl.com',
                    'type': 'Innovation District',
                    'eligibility_criteria': 'Tech and bioscience companies',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Space and services',
                    'contact_info': 'Cortex'
                },
                {
                    'name': 'BioGenerator',
                    'description': 'Life sciences startup accelerator in St. Louis',
                    'website': 'https://biogenerator.org',
                    'type': 'Life Sciences Accelerator',
                    'eligibility_criteria': 'Life sciences startups',
                    'application_deadline': 'Ongoing',
                    'funding_amount': 'Investment and services',
                    'contact_info': 'BioGenerator'
                }
            ]
        }
    }
    
    # Add resources to existing data
    for state_abbr, categories in state_resources.items():
        for category, resources in categories.items():
            for resource in resources:
                # Check if resource already exists
                existing = False
                for existing_resource in data[state_abbr][category]:
                    if existing_resource['name'] == resource['name']:
                        existing = True
                        break
                if not existing:
                    data[state_abbr][category].append(resource)
    
    # Add generic SBDC and SBA resources for all states
    for state_abbr in data.keys():
        state_name = [name for name, abbr in STATE_MAPPING.items() if abbr == state_abbr][0]
        
        # Add SBDC if not already present
        sbdc_exists = any('SBDC' in resource.get('type', '') for resource in data[state_abbr]['educational_programs'])
        if not sbdc_exists:
            data[state_abbr]['educational_programs'].append({
                'name': f'{state_name} Small Business Development Center',
                'description': 'Free business consulting, training, and technical assistance',
                'website': 'https://www.sba.gov/local-assistance/find',
                'type': 'SBDC',
                'eligibility_criteria': 'Small businesses and entrepreneurs',
                'application_deadline': 'Ongoing',
                'funding_amount': 'Free services',
                'contact_info': 'Find local SBDC office via SBA website'
            })
        
        # Add SCORE if not already present
        score_exists = any('SCORE' in resource.get('type', '') for resource in data[state_abbr]['educational_programs'])
        if not score_exists:
            data[state_abbr]['educational_programs'].append({
                'name': f'SCORE {state_name}',
                'description': 'Free business mentoring and workshops',
                'website': 'https://www.score.org',
                'type': 'SCORE',
                'eligibility_criteria': 'Small businesses and entrepreneurs',
                'application_deadline': 'Ongoing',
                'funding_amount': 'Free services',
                'contact_info': 'Find local SCORE chapter via website'
            })
        
        # Add SBA District Office
        sba_exists = any('SBA' in resource.get('type', '') for resource in data[state_abbr]['funding'])
        if not sba_exists:
            data[state_abbr]['funding'].append({
                'name': f'SBA {state_name} District Office',
                'description': 'Federal small business loans, grants, and assistance programs',
                'website': 'https://www.sba.gov/local-assistance/find',
                'type': 'SBA District Office',
                'eligibility_criteria': 'Small businesses meeting SBA size standards',
                'application_deadline': 'Ongoing',
                'funding_amount': 'Various loan and grant programs',
                'contact_info': 'Find local SBA office via website'
            })
    
    # Save updated JSON
    save_json_file(json_file, data)
    
    # Print summary
    total_resources = 0
    for state, categories in data.items():
        state_total = sum(len(resources) for resources in categories.values())
        if state_total > 0:
            print(f"{state}: {state_total} resources")
            total_resources += state_total
    
    print(f"Total resources in database: {total_resources}")
    return data

if __name__ == "__main__":
    parse_state_resources()
