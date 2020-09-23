import * as yup from 'yup';

export default yup.object().shape({
    message: yup.string().min('6', 'Response must be 6 characters or longer'),
});