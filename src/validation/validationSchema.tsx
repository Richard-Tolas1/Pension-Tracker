import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    desiredIncome: Yup.number()
        .required('Desired income is required')
        .positive('Desired income must be a positive number'),
    
    employerContribution: Yup.number()
        .required('Employer contribution is required')
        .min(0, 'Employer contribution cannot be negative'),
    
    personalContribution: Yup.number()
        .required('Personal contribution is required')
        .min(0, 'Personal contribution cannot be negative'),
    
    retirementAge: Yup.number()
        .required('Retirement age is required')
        .min(26, 'Retirement age must be at least 26')
        .max(80, 'Retirement age cannot exceed 80'),
});
