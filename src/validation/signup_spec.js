import * as yup from 'yup';

export default yup.object().shape({
    username: yup.string().required("Must enter a username"),
    password: yup.string().required("Must enter a password"),
    role: yup.string().required('Must select a role'),
});