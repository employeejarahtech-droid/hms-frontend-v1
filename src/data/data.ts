
export const departments = [
    { id: "1", name: "Xray" },
    { id: "2", name: "Ultra-sonography" },
    { id: "3", name: "Pathology" },
    { id: "4", name: "Others" },
];


// Example category data
export const categoryData = [
    { id: 2, DeptID: 3, CategoryName: "Urine" },
    { id: 3, DeptID: 3, CategoryName: "Immunological Test" },
    { id: 4, DeptID: 3, CategoryName: "Biochemical Test" },
    { id: 6, DeptID: 1, CategoryName: "Digital X-Ray" },
    { id: 7, DeptID: 2, CategoryName: "Ultra-sonography" },
    { id: 8, DeptID: 3, CategoryName: "Haematological" },
    { id: 9, DeptID: 3, CategoryName: "Stool" },
    { id: 10, DeptID: 1, CategoryName: "ECG" },
    { id: 11, DeptID: 3, CategoryName: "Hormone" },
    { id: 12, DeptID: 3, CategoryName: "Special Inv" },
    { id: 13, DeptID: 1, CategoryName: "X-RAY D.S.B.V.P.T" }
];


// export const testData = [
//     { id: "1", name: "Complete Blood Count (CBC)", category: "Hematology", status: "passed" as "passed" | "failed" | "pending", score: 98 },
//     { id: "2", name: "Lipid Profile", category: "Cardiology", status: "failed" as "passed" | "failed" | "pending", score: 55 },
//     { id: "3", name: "Liver Function Test (LFT)", category: "Biochemistry", status: "pending" as "passed" | "failed" | "pending", score: 0 },
//     { id: "4", name: "Thyroid Panel (TSH/T3/T4)", category: "Endocrinology", status: "passed" as "passed" | "failed" | "pending", score: 92 },
//     { id: "5", name: "Urinalysis", category: "Pathology", status: "failed" as "passed" | "failed" | "pending", score: 45 },
//     { id: "6", name: "Electrocardiogram (ECG)", category: "Cardiology", status: "pending" as "passed" | "failed" | "pending", score: 0 },
// ];

export const testData = [
    { id: 4, name: "Fasting Blood Sugar (F.B.S.)", category: "Hematology", NormalRange: "65-110mg/dl", TestCharge: 150, CategoryID: 4, unit: "mg/dl", TableName: "BIOALLID", TableField: "BIOALLID",  status: "passed" as "passed" | "failed" | "pending" },
    { id: 5, name: "ExperimentAny2", NormalRange: "N/A", category: "Hematology", TestCharge: 0, CategoryID: 4, unit: "----mg/dl", TableName: "BIOALLID", TableField: "BIOALLID",  status: "passed" as "passed" | "failed" | "pending" },
    { id: 6, name: "Blood Sugar 1.5 hours after Breakfast", category: "Hematology", NormalRange: "<140mg/dl", TestCharge: 150, CategoryID: 4, unit: "mg/dl", TableName: "BIOALLID", TableField: "BIOALLID",  status: "passed" as "passed" | "failed" | "pending" },
    { id: 7, name: "Blood Sugar 2 hours after Breakfast", category: "Hematology", NormalRange: "<140 mg/dl", TestCharge: 150, CategoryID: 4, unit: "mg/dl", TableName: "BIOALLID", TableField: "BIOALLID",  status: "passed" as "passed" | "failed" | "pending" },
];


export const doctorsData = [
    { id: "1", name: "Amit Kumar Bose", title: "Dr.", qualification: "MBBS, DMRT", speciality: "Medicine", country: "Bangladesh", city: "Kurigram", phone: "01191133239", mobile: "01715394737", email: "www" },
    { id: "2", name: "Shoopon Kumar", title: "Dr.", qualification: "MBBS, DMRT, FCPS", speciality: "Medicine", country: "Bangladesh", city: "Kurigram", phone: "000", mobile: "00", email: "www" },
    { id: "3", name: "Md. Rakbul Islam", title: "Dr.", qualification: "FCPS (Medicine)", speciality: "N/A", country: "Bangladesh", city: "N/A", phone: "000", mobile: "00", email: "www" },
    { id: "4", name: "Arup Chakravarty", title: "Dr.", qualification: "MBBS, MCPS", speciality: "DLO", country: "Bangladesh", city: "N/A", phone: "4454545", mobile: "017161992559", email: "www" },
    { id: "5", name: "Nazem Ahmed", title: "Dr.", qualification: "MBBS, CCD, CMU", speciality: "N/A", country: "Bangladesh", city: "N/A", phone: "198996816", mobile: "01719899616", email: "www" },
    { id: "6", name: "Devendra Nath", title: "Dr.", qualification: "MBBS, MCPS", speciality: "N/A", country: "Bangladesh", city: "N/A", phone: "789", mobile: "01819986616", email: "www" },
    { id: "7", name: "Ranenra Nath", title: "Dr.", qualification: "MBBS, MCPS", speciality: "N/A", country: "America", city: "N/A", phone: "54657687", mobile: "01712112345", email: "www" },
    { id: "8", name: "A.K.M. Nurunnoor", title: "Prof.Dr.", qualification: "MBBS, D.D.V, FCPS", speciality: "Health", country: "Bangladesh", city: "N/A", phone: "45576788", mobile: "01712123457", email: "www" },
    // Continue adding doctors as needed...
];