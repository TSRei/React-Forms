import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import {
  TextField,
  Button,
  Box,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import * as Yup from "yup";

const formValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Minimum of 2 characters")
    .max(75, "75 characters max")
    .required("Required"),
  content: Yup.string().min(10).max(250).required("Required"),
  friends: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().min(2).max(50).required("Required"),
      })
    )
    .required("Add at least one friend")
    .min(1),
});

class FormikMaterialUi extends React.Component {
  state = {
    sports: [
      { id: 1, name: "Soccer" },
      { id: 2, name: "Basketball" },
      { id: 3, name: "Football" },
      { id: 4, name: "Cricket" },
      { id: 5, name: "Hockey" },
      { id: 6, name: "I hate sports" },
    ],
    formData: {
      fullName: "",
      checked: false,
      color: "",
      content: "",
      sportId: 0,
      friends: [],
    },
  };

  handleSubmit = (values) => {
    console.log(values);
  };

  mapSport = (sports) => (
    <option value={sports.id} key={`sport_${sports.id}`}>
      {sports.name}
    </option>
  );

  render() {
    return (
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Grid>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.formData}
            onSubmit={this.handleSubmit}
            validationSchema={formValidationSchema}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form>
                <Box className="d-flex justify-content-start">
                  <TextField
                    name="fullName"
                    label="Full Name"
                    value={values.fullName}
                    onChange={handleChange}
                    variant={"outlined"}
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && Boolean(errors.fullName)}
                  />
                </Box>
                <Box className="d-flex justify-content-start mt-4">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.checked}
                        onChange={handleChange}
                        name="checked"
                        color="primary"
                      />
                    }
                    label="Primary"
                  ></FormControlLabel>
                </Box>
                <Box className="form-check">
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="color"
                    value="red"
                  />
                  <label className="form-check-label">Red</label>
                </Box>
                <Box className="form-check">
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="color"
                    value="blue"
                  />
                  <label className="form-check-label">Blue</label>
                </Box>
                <Box className="form-check">
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="color"
                    value="green"
                  />
                  <label className="form-check-label">Green</label>
                </Box>
                <Box className="mt-4 form-group">
                  <label htmlFor="content">Enter your favorite quote:</label>
                  <Field
                    component="textarea"
                    name="content"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="has-error"
                  />
                </Box>
                <Box className="form-group mt-4">
                  <Field
                    component="select"
                    name="sportId"
                    className="form-control"
                  >
                    <option value="">Please select a sport</option>
                    {this.state.sports.map(this.mapSport)}
                  </Field>
                </Box>
                <Box className="form-group d-flex justify-content-center">
                  <FieldArray name="friends">
                    {({ push, remove }) => (
                      <div>
                        <Button
                          className="my-4"
                          color="inherit"
                          variant="contained"
                          onClick={() => push({ name: "" })}
                        >
                          Add Friend
                        </Button>
                        {values.friends &&
                          values.friends.map((friend, index) => (
                            <div className="row mb-4">
                              <div className="col">
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  size="small"
                                  onClick={() => remove(index)}
                                >
                                  Delete
                                </Button>
                              </div>
                              <div className="col-10">
                                <Field
                                  type="text"
                                  name={`friends.${index}.name`}
                                  className="form-control"
                                  placeholder="Friend's Name"
                                ></Field>
                              </div>
                              <ErrorMessage
                                name={`friends.${index}.name`}
                                component="div"
                                className="has-error"
                              ></ErrorMessage>
                            </div>
                          ))}
                      </div>
                    )}
                  </FieldArray>
                </Box>
                <Box className="d-flex justify-content-center">
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Container>
    );
  }
}

export default FormikMaterialUi;
