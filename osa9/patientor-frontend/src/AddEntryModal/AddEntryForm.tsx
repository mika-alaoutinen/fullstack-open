import React from 'react';
import { Field, Formik, Form } from "formik";

import { DiagnosisSelection, GenderOption, NumberField, SelectField, TextField } from "../components/FormField";
import { Entry, HealthCheckEntry, HealthCheckRating } from '../types';
import { useStateValue } from '../state';
import { todaysDate } from '../utils';
import { Button, Grid } from 'semantic-ui-react';

interface Props {
  onSubmit: (values: HealthCheckEntry) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        id: '',
        date: '',
        type: 'HealthCheck', // Get from a button selection?
        specialist: '',
        diagnosisCodes: [],
        description: '',
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        return errors;
      }}
      >
      
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Date'
              placeholder={todaysDate()}
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Dr. Firstname Lastname'
              name='specialist'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
          <Field
            label="healthCheckRating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />

            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddEntryForm;