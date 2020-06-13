import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import pingService from './services/pingService';
import { setPatientList } from "./state/reducer";
import { useStateValue } from "./state";

import PatientDetailsPage from "./PatientDetailsPage/PatientDetailsPage";
import PatientListPage from "./PatientListPage/PatientListPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    pingService.ping();

    const fetchPatientList = async () => {
      dispatch(await setPatientList());
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>Home</Button>
          <Divider hidden />

          <Switch>
            <Route path="/patients/:id" render={() => <PatientDetailsPage />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
