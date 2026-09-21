export type ServiceContent = {
  heading: string;
  when: string;
  overview: string;
  evidence: string[];
  deliver: string[];
  question: string;
  answer: string;
  related: string[];
  source?: string;
};
export const serviceContent: Record<string, ServiceContent> = {
  "commercial-epcs": {
    heading: "Commercial EPC Assessments",
    when: "Preparing to sell or let a non-domestic property, completing a new building, or reviewing an existing energy rating? Send the address and intended transaction so we can establish the assessment scope. Requirements and exemptions depend on the property and jurisdiction.",
    overview:
      "A commercial Energy Performance Certificate records the assessed energy performance of a non-domestic building. The assessment considers the building fabric and its fixed services rather than simply reproducing utility bills. The recommendations help owners understand where improvements may be worth investigating.",
    evidence: [
      "Property address, current use and approximate floor area",
      "Floor plans and any existing EPC",
      "Heating, cooling, ventilation and lighting information",
      "Access arrangements and the transaction deadline",
    ],
    deliver: [
      "Survey of building geometry, construction and fixed services",
      "Energy model and lodged non-domestic EPC",
      "Recommendation report and explanation of next steps",
    ],
    question: "Does the assessment guarantee an improved rating?",
    answer:
      "No. The rating reflects the building and evidence available. We can explain the factors affecting it and discuss potential improvements, but a particular rating cannot be guaranteed before assessment.",
    related: [
      "section-63-assessments",
      "sbem-calculations",
      "dynamic-simulation-modelling-dsm",
    ],
    source:
      "https://www.mygov.scot/energy-performance-certificates/when-you-need-epc",
  },
  saps: {
    heading: "SAP Calculations",
    when: "Arrange a design-stage review for a new dwelling or a residential conversion where an energy calculation is needed. Confirm the project location, building warrant or control application stage and specification before the assessment begins.",
    overview:
      "SAP calculations assess the energy performance of dwellings using their design and specification. Bringing the assessment into the design process gives the team time to review insulation, glazing and building services. Completion-stage outputs need to reflect what was actually built.",
    evidence: [
      "Floor plans, sections and elevations",
      "Wall, roof and floor build-ups, including insulation",
      "Window and door specifications",
      "Heating, hot water, ventilation and renewable systems",
      "Air permeability target or test result, where available",
    ],
    deliver: [
      "Design-stage energy calculations from drawings and specifications",
      "Feedback on fabric and services options where changes are needed",
      "As-built updates and agreed completion-stage documentation",
    ],
    question: "Can you work with our architect?",
    answer:
      "Yes. We can coordinate the information with your architect and project team. Tell us who holds the drawings and specification, and whether the instruction is for design stage, completion or both.",
    related: [
      "overheating-assessments-tm59",
      "domestic-epcs-and-legionellas",
      "sbem-calculations",
    ],
  },
  "sbem-calculations": {
    heading: "SBEM Calculations & BRUKL Reports",
    when: "Consider SBEM early in a non-domestic new-build, extension or conversion project. The required calculation and reporting route depends on the building, location and applicable standards. We confirm the scope against your project stage.",
    overview:
      "SBEM uses the building geometry, fabric and services specification to assess non-domestic energy performance. A BRUKL report records the relevant compliance calculation results. Reviewing the design before specifications are fixed can help the team resolve performance issues with fewer late changes.",
    evidence: [
      "Plans, elevations and sections with dimensions",
      "Building activities, zoning and occupancy information",
      "Fabric and glazing specifications",
      "Heating, cooling, ventilation and hot water details",
      "Lighting layouts, efficiencies and controls",
    ],
    deliver: [
      "Non-domestic energy model and agreed compliance outputs",
      "BRUKL reporting appropriate to the project requirements",
      "Design feedback and agreed scenario testing",
      "Completion-stage updates or EPC coordination where included",
    ],
    question: "Is a BRUKL report the same as an EPC?",
    answer:
      "No. They serve different purposes. BRUKL records compliance calculation results; an EPC records an energy rating. Some of the model information may support both, but we will confirm the outputs included in your quotation.",
    related: ["commercial-epcs", "dynamic-simulation-modelling-dsm", "saps"],
  },
  fras: {
    heading: "Fire Risk Assessments",
    when: "A fire risk assessment helps those responsible for relevant premises understand and manage fire risks. The duty and assessment scope depend on the premises, use and jurisdiction. Tell us about sleeping accommodation, occupancy and any known concerns at enquiry stage.",
    overview:
      "The assessment reviews fire hazards, people at risk and the precautions and management arrangements in place. A written report identifies findings and prioritised actions. Commissioning an assessment does not transfer the duty holder’s responsibility for managing fire safety.",
    evidence: [
      "Address, building use, floor area and occupancy",
      "Plans and details of access to relevant areas",
      "Previous assessment and action records, if available",
      "Fire alarm, emergency lighting and maintenance records",
      "Any recent alterations or changes of use",
    ],
    deliver: [
      "On-site review within the agreed inspection scope",
      "Written findings and prioritised action schedule",
      "Explanation of the actions and any further specialist investigation needed",
    ],
    question: "Does this include intrusive inspection or remedial work?",
    answer:
      "The quotation defines the inspection scope. Do not assume that intrusive investigation, specialist testing or remedial work is included. We identify where further investigation may be needed and discuss the next steps.",
    related: ["commercial-epcs", "domestic-epcs-and-legionellas"],
    source:
      "https://www.firescotland.gov.uk/businesses-and-landlords/fire-risk-assessment/",
  },
  "section-63-assessments": {
    heading: "Section 63 Assessments",
    when: "Check the Section 63 position early when preparing a qualifying non-domestic building in Scotland for sale or lease to a new tenant. The regulations concern buildings over 1,000 m², with exemptions and other conditions. Floor area alone does not establish the full compliance position.",
    overview:
      "Section 63 assessments address energy and emissions performance for qualifying existing non-domestic buildings in Scotland. We review the property information, discuss whether the assessment is appropriate and support the Action Plan and subsequent compliance route within the agreed scope.",
    evidence: [
      "Property address, use and gross internal floor area",
      "Existing EPC and any earlier Action Plan",
      "Plans and construction or refurbishment information",
      "Building-services details",
      "Sale or lease programme and access arrangements",
    ],
    deliver: [
      "Review of the property and relevant assessment requirements",
      "Section 63 assessment and agreed Action Plan documentation",
      "Explanation of improvement measures and next steps",
    ],
    question: "Is Section 63 the same as a commercial EPC?",
    answer:
      "No. An EPC and a Section 63 assessment are distinct. A property may need an EPC without requiring Section 63. Share the building details and existing documentation so we can discuss which services apply.",
    related: ["commercial-epcs", "decs"],
    source:
      "https://www.gov.scot/publications/energy-performance-of-existing-non-domestic-buildings-information/",
  },
  decs: {
    heading: "Display Energy Certificates",
    when: "Ask us to check the appropriate operational energy reporting route for your building and jurisdiction. Public-building requirements and Section 63-related reporting are different contexts; we confirm the required scope before instruction.",
    overview:
      "A Display Energy Certificate uses operational energy information to report on a building’s performance. Reliable consumption records, floor areas and use information are important. We review the available data and agree what is needed before preparing the output.",
    evidence: [
      "Energy consumption records for the reporting period",
      "Floor area, building use and occupancy information",
      "Previous certificates and advisory reports",
      "Metering arrangements and any shared supplies",
    ],
    deliver: [
      "Review of the operational energy dataset",
      "Agreed certificate and advisory reporting",
      "Explanation of data gaps and improvement priorities",
    ],
    question: "What if our energy data is incomplete?",
    answer:
      "Send the records you have. We will identify missing information and discuss whether a reliable assessment can proceed. Shared supplies and gaps in consumption records may need to be resolved first.",
    related: [
      "section-63-assessments",
      "commercial-epcs",
      "dynamic-simulation-modelling-dsm",
    ],
  },
  "overheating-assessments-tm59": {
    heading: "TM59 Overheating Assessments",
    when: "Consider overheating assessment while a residential design can still be adjusted, or when a planning or technical brief asks for overheating evidence. Confirm the assessment criteria and project requirements with your design team.",
    overview:
      "TM59 provides a method for assessing overheating risk in homes through dynamic thermal modelling. The model considers how the proposed design responds to weather, solar gains, occupancy and ventilation assumptions. Its usefulness depends on an accurate, agreed brief.",
    evidence: [
      "Plans, sections, elevations and orientation",
      "Glazing, shading and construction specifications",
      "Window opening and ventilation arrangements",
      "Occupancy assumptions and assessment criteria",
    ],
    deliver: [
      "Dynamic thermal model for the agreed residential design",
      "Assessment of overheating risk against the agreed criteria",
      "Testing of mitigation options where included",
      "Report recording inputs, assumptions and results",
    ],
    question: "Can you test changes to the design?",
    answer:
      "Yes, where scenario testing is included in the scope. Changes such as shading or ventilation arrangements can be assessed in the model. Agree the number and type of scenarios before instruction.",
    related: ["saps", "dynamic-simulation-modelling-dsm"],
  },
  "dynamic-simulation-modelling-dsm": {
    heading: "Dynamic Simulation Modelling",
    when: "Use detailed building modelling when the project needs a closer examination of energy, comfort or overheating performance. We help define the question the model needs to answer and the evidence required for it.",
    overview:
      "Dynamic simulation models how a building responds over time to weather, occupancy and system operation. It allows a project team to compare assumptions and options in a consistent model. Results are predictions based on the agreed inputs, not guarantees of in-use performance.",
    evidence: [
      "Architectural geometry and construction information",
      "Building-services specifications and control assumptions",
      "Occupancy patterns, schedules and internal gains",
      "Weather data requirements and performance criteria",
      "Options to compare and reporting milestones",
    ],
    deliver: [
      "Model build using the agreed project information",
      "Scenario testing and sensitivity analysis",
      "Technical report with assumptions, limitations and findings",
    ],
    question: "When is DSM more useful than a simpler calculation?",
    answer:
      "It can be useful where time-dependent behaviour, complex servicing, comfort or option comparisons matter. We review your brief to determine whether detailed modelling adds useful evidence and agree a proportionate scope.",
    related: [
      "sbem-calculations",
      "overheating-assessments-tm59",
      "commercial-epcs",
    ],
  },
  "domestic-epcs-and-legionellas": {
    heading: "Domestic EPCs & Legionella Risk Assessments",
    when: "Contact us when preparing a home for sale or letting, or reviewing water safety arrangements for a rental property. EPC and Legionella assessments address different issues; we can discuss either service or a coordinated visit.",
    overview:
      "A domestic EPC assesses a home’s energy performance. A Legionella risk assessment reviews the relevant water system and risk controls. We help owners and agents coordinate access, understand the findings and identify follow-up actions within the agreed scope.",
    evidence: [
      "Property address and type",
      "Access and occupant contact arrangements",
      "Existing EPC or water risk assessment, if available",
      "Details of the water system and known changes",
    ],
    deliver: [
      "Domestic EPC assessment and lodgement where instructed",
      "Water-system risk review where instructed",
      "Clear findings and relevant follow-up actions",
    ],
    question: "Can I book only one of the services?",
    answer:
      "Yes. You can request a domestic EPC or a Legionella assessment separately. A combined appointment may be possible where the property and scope are suitable.",
    related: ["commercial-epcs", "fras", "saps"],
  },
};

serviceContent["domestic-epcs"] = {
  heading: "Domestic EPC Assessments",
  overview:
    "A domestic EPC records the assessed energy performance of a home and includes recommendations for improvement. We coordinate the information, visit and certificate lodgement for owners and agents.",
  when: "Contact us when preparing a home for sale or letting, or when an existing certificate needs to be reviewed. Requirements and exemptions depend on the property and jurisdiction.",
  evidence: [
    "Full property address and type",
    "Existing EPC, if available",
    "Access arrangements and contact person",
    "Information about insulation, heating and alterations",
  ],
  deliver: [
    "Domestic energy assessment within the agreed scope",
    "Lodged EPC",
    "Recommendations and explanation of next steps",
  ],
  question: "Can you arrange the visit with our letting agent?",
  answer:
    "Yes. Give us the agent’s contact details and access arrangements with their permission. Tell us your target date so we can discuss availability.",
  related: [
    "legionella-risk-assessments",
    "saps",
    "domestic-epcs-and-legionellas",
  ],
  source:
    "https://www.mygov.scot/energy-performance-certificates/when-you-need-epc",
};
serviceContent["legionella-risk-assessments"] = {
  heading: "Legionella Risk Assessments",
  overview:
    "A Legionella assessment reviews the relevant water system, how it is used and the risk controls in place. The findings help the person managing the property identify follow-up actions. It is a separate service from an energy assessment.",
  when: "Arrange a review when assessing water safety at a rental property or following changes that could affect the water system or its use. Tell us about previous findings and any known concerns so we can establish a suitable scope.",
  evidence: [
    "Property address, type and occupancy",
    "Water-system information and access arrangements",
    "Previous risk assessment and action records",
    "Recent changes to the system or periods without use",
  ],
  deliver: [
    "Review of the water system within the agreed scope",
    "Written findings and risk-control recommendations",
    "Identification of follow-up actions",
  ],
  question: "Does the assessment include water sampling?",
  answer:
    "Sampling is not automatically included. The scope depends on the system and the assessment findings. We will explain any further investigation that may be needed.",
  related: ["domestic-epcs", "domestic-epcs-and-legionellas", "fras"],
};
