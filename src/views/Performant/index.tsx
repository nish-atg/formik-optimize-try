import {Grid, Select, MenuItem} from '@mui/material';
import {Formik, Form, FieldArray} from 'formik';
import * as yup from 'yup';
import React, {memo} from 'react';
import {PerformantTextField} from '../../components/Fields/Form/PerformantTextField';

export type PerformantProps = {};

const options = ['ford', 'ferrari', 'hyundai', 'toyota'];

const Schema = yup.object().shape({
  loadItems: yup.array().of(
    yup.object().shape({
      someText: yup
        .string()
        .trim()
        .ensure()
        .min(3, 'Please describe with minimum 3 characters')
        .required('rquired'),
      brand: yup
        .string()
        .oneOf(options, 'Please select a brand.')
        .ensure()
        .required('required'),
      description: yup
        .string()
        .trim()
        .ensure()
        .min(1, 'Please describe with minimum 3 characters')
        .required('rquired'),
    })
  ),
});

export const Performant: React.FC<PerformantProps> = memo((props) => {
  const totalFields = new Array(100).fill({someText: '', brand: ''});
  return (
    <Formik
      initialValues={{
        loadItems: totalFields,
      }}
      validationSchema={Schema}
      validateOnChange={false}
      onSubmit={() => {}}
    >
      {({values}) => {
        return (
          <Form>
            <Grid container style={{padding: 10}}>
              <FieldArray name='loadItems'>
                {(arrayHelpers: any) => (
                  <div>
                    {values.loadItems.map((f, i) => (
                      <Grid
                        container
                        key={`field-${i}`}
                        style={{marginBottom: 10}}
                      >
                        <Grid
                          container
                          item
                          xs={1}
                          justifyContent='center'
                          alignItems='center'
                        >
                          <span>{i + 1}</span>
                        </Grid>
                        <Grid item xs={3}>
                          <PerformantTextField
                            label={'someText #' + (i + 1)}
                            name={`loadItems[${i}].someText`}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <Select
                            name={`loadItems[${i}].brand`}
                            style={{width: 150, marginLeft: 20}}
                          >
                            {options.map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={3}>
                          <PerformantTextField
                            label={'Description #' + (i + 1)}
                            name={`loadItems[${i}].description`}
                          />
                        </Grid>
                      </Grid>                
                    ))}
                  </div>
                )}
              </FieldArray>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
});
