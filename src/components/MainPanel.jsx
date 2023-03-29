import { Button } from "react-bootstrap";
import {Container, Col, FloatingLabel,} from "react-bootstrap"
import Form from 'react-bootstrap/Form'

export const MainPanel = (props) => {
  const renderRegionOptinos = (regions) => {
    return regions.map((region) => {
      return (
        <option key={props.uuidv4()} value={region}>
          {region}
        </option>
      );
    });
  };

  return (
            <Container className="d-flex justify-content-between align-items-center p-2">
                      <Col md style={{maxWidth: 300}}>
                        <FloatingLabel
                            style={{width: 200}}
                            controlId="floatingSelectGrid"
                            label="Сountry selection"
                        >
                            <Form.Select 
                                value={props.region} 
                                onChange={props.handleRegionSelection }  
                                aria-label="Floating label select example"
                            >
                               {renderRegionOptinos(props.regions)}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <div>
                        <span style={{color: 'white'}}>Number of errors per user</span>
                        <Form.Control
                            style={{width:100}}
                            id='errors-number'
                            type="number"
                            step={0.5}
                            min='0'
                            max='1000'
                            value={props.errorCount}
                            onChange={props.handleErrorCount }
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                        />
                        <Form.Range
                            id='errors-slider'
                            type="range"
                            min='0'
                            max='1000'
                            value={props.errorCount}
                            onChange={props.handleSliderChange }
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                        >
                        </Form.Range>
                    </div>
                    <div className="d-flex  flex-column row g-2">
                      <span style={{color: 'white'}}>Current seed</span>
                        <Form.Control
                            style={{width:100}}
                            id='seed-number'
                            type="number"
                            min='0'
                            max={30000}
                            value={props.seed}
                            onChange={props.handleSeedSelection }
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                        />
                        <Button 
                            variant="warning"
                            id='seed-generate'
                            onClick={props.handleSeedSelection }
                        >
                            Generate new seed
                        </Button>
                    </div>
            </Container>
        )
};
