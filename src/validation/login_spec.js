import * as yup from 'yup';

export default yup.object().shape({
    email: yup.string().required("Must enter an email address"),
    password: yup.string().required("Must enter a password")
});