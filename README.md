# ASH Security Report Generator

A standalone browser-based cybersecurity report generation application created by me (Mohammed Ashraf Shaikh) for a university dissertation & lab testing project.

## Report types

1. Vulnerability Assessment Report
2. Attack Surface Report
3. Attack Path / Kill Chain Report
4. Windows Event Log Analysis Report
5. Incident Response Report
6. MITRE ATT&CK Mapping Report
7. SIEM / SOC Dashboard Report
8. Risk Assessment Report
9. Remediation / Hardening Report

## GitHub Pages

This project is intentionally structured as a static website:

- `index.html` — application interface
- `styles.css` — presentation styles
- `app.js` — report generation, calculations and visualizations
- `sample-data/` — sanitized demonstration CSV files

No Node.js installation or build process is required.

University staff can then open the URL directly in a normal browser without downloading the project.

## Sample data

The `sample-data` directory contains nine CSV files corresponding to the nine report types.

The sample data is synthetic and documentation-oriented. It represents an authorized university laboratory scenario involving a Kali Linux assessment workstation and a Windows Server 2008 R2 / Active Directory lab server.

It contains no real passwords, production credentials, or confidential university information.

## Privacy warning

Do **not** publish real credentials, captured authentication material, private IP addresses, personal information, confidential university records, or real forensic evidence to a public GitHub repository or GitHub Pages site.

Keep actual evidence in a private location and use sanitized data for demonstrations.

## Calculations and visuals

The report generator uses the same normalized records for report tables, calculations and visualizations.

For the risk assessment scenario:

`Risk Score = Likelihood × Impact`

The visualizations are generated in the browser using the supplied records; no server-side report service is required.

## Academic use

This project is intended for an authorized university cybersecurity project reporting exercise. Security testing should only be conducted against systems for which explicit authorization has been provided.
