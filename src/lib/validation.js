const yup = require('yup');

function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body);

            next();
        } catch (error) {
            next(error);
        }
    };
}

function createUsersValidation(data) {
    const schema = yup.object().shape({
        PERSONA_NOMBRE: yup.string()
            .min(10, 'Campo nombre minimo 10 caracteres')
            .matches(/^[a-zA-Z ]+$/, 'Campo nombre solo debe de tener letras')
            .required('Campo nombre requerido'),

        PERSONA_TELEFONO: yup.string()
            .min(8, 'Campo telefono minimo 8 caracteres')
            .matches(/^[0-9]+$/, 'Campo telefono solo debe de tener numeros')
            .required('Campo telefono requerido'),

        PERSONA_EMAIL: yup.string()
            .email('Correo electronico invalido')
            .required('Campo email requerido'),

        PERSONA_CONTRASENA: yup.string()
            .min(6, 'Campo contraseña minimo 6 caracteres')
            .required('Campo contraseña requerido'),
    });

    schema.validateSync(data);

    const { DIRECCION_ID } = data;

    if (Number(DIRECCION_ID) <= 0) {
        throw new Error('Error en el campo dirección');
    }
}

function createProductsValidation(data) {
    // PRODUCTO_CANTIDAD, PRODUCTO_PRECIO, PRODUCTO_MEDIDA, PRODUCTO_FECHALIMITE, PRODUCTO_FECHACOCECHA
    const schema = yup.object().shape({
        PRODUCTO_NOMBRE: yup.string()
            .min(4, 'Campo nombre minimo 4 caracteres')
            .matches(/^[a-zA-Z ]+$/, 'Campo nombre solo debe de tener letras')
            .required('Campo nombre requerido'),

        PRODUCTO_CANTIDAD: yup.string()
            .min(1, 'Campo cantidad minimo 1 valor')
            .matches(/^[0-9]+$/, 'Campo cantidad solo debe de tener numeros')
            .required('Campo cantidad requerido'),

        PRODUCTO_PRECIO: yup.string()
            .min(1, 'Campo precio minimo 1 valor')
            .matches(/^\d+(?:.\d+)?$/, 'Campo precio solo debe de tener numeros')
            .required('Campo precio requerido'),

        PRODUCTO_MEDIDA: yup.string()
            .min(1, 'Campo medida minimo 1 valor')
            .matches(/^\d+(?:.\d+)?$/, 'Campo peso solo debe de tener numeros')
            .required('Campo peso requerido'),

        PRODUCTO_DESCRIPCION: yup.string()
            .min(10, 'Campo descripción debe tener minimo 10 caracteres')
            .required('Campo contraseña requerido'),

        PRODUCTO_FECHACOCECHA: yup.date()
            .max(new Date(), 'El campo fecha de cocecha debe ser menor al del día de hoy')
            .required('Campo fecha de cocecha requerido'),

        PRODUCTO_FECHALIMITE: yup.date()
            .min(new Date(), 'El campo fecha limite debe ser mayor al del día de hoy')
            .required('Campo fecha limite requerido'),
    });

    schema.validateSync(data);

    const { CATEGORIA_ID, PRESENTACION_ID, MEDIDA_ID } = data;

    if (Number(CATEGORIA_ID) <= 0) {
        throw new Error('Error en el campo categoria');
    }

    if (Number(PRESENTACION_ID) <= 0) {
        throw new Error('Error en el campo presentación');
    }

    if (Number(MEDIDA_ID) <= 0) {
        throw new Error('Error en el campo unidad de medida');
    }

}

module.exports = {
    validate,
    createUsersValidation,
    createProductsValidation
};