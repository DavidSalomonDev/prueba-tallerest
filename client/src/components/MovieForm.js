import React, {useState} from "react";
import styled from "styled-components";
import {handleSubmit} from "../api/Api";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;

`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const MovieForm = () => {
    const notify = () => toast("La película ha sido enviada con éxito.");
    // Estado de los campos del formulario
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        duration: "",
        budget: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        date: "",
        duration: "",
        budget: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        // Reiniciar los mensajes de error cuando el usuario ingresa valores en el input
        setErrors({...errors, [name]: ""});
    };

    // Validadores de los inputs
    const validateForm = () => {
        let valid = true;
        const formErrors = {};

        // Revisa si el nombre está vacío
        if (!formData.name.trim()) {
            formErrors.name = "*El nombre es obligatorio";
            valid = false;
        }

        // Revisa si la fecha está vacía
        if (!formData.date.trim()) {
            formErrors.date = "*La fecha de estreno es obligatoria";
            valid = false;
        }

        // La duración debe de ser un número
        if (!formData.duration.trim() || formData.duration < 0) {
            formErrors.duration = "*La duración debe ser un número mayor a 0";
            valid = false;
        }

        // El presupuesto debe ser un número
        if (!formData.budget.trim() || formData.duration < 0) {
            formErrors.budget = "*El presupuesto debe ser un número mayor a 0";
            valid = false;
        }

        setErrors(formErrors);
        return valid;
    }

    const handleFormSubmit = async () => {
        let isFormValid = validateForm();
        if (isFormValid) {
            try {
                await handleSubmit(formData);
                notify();
                setFormData({
                    name: "",
                    date: "",
                    duration: "",
                    budget: ""
                })
            } catch (error) {
                console.error("Error submitting data:", error);
            }
        }

    };

    return (
        <FormWrapper>
            <FormField>
                <Label>Nombre:</Label>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormField>
            <FormField>
                <Label>Fecha de estreno:</Label>
                <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
                {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
            </FormField>
            <FormField>
                <Label>Duración (minutos):</Label>
                <Input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                />
                {errors.duration && <ErrorMessage>{errors.duration}</ErrorMessage>}
            </FormField>
            <FormField>
                <Label>Presupuesto:</Label>
                <Input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                />
                {errors.budget && <ErrorMessage>{errors.budget}</ErrorMessage>}
            </FormField>
            <Button onClick={handleFormSubmit}>Guardar</Button>
            <ToastContainer/>
        </FormWrapper>
    );
};

export default MovieForm;