import React from 'react';
import './addpropertymodal.css';
import Select from 'react-select';
import {css} from 'emotion';

function validate(tenant, unit, property, llbroker, ttbroker) { 
  return {
    tenant: (tenant.length === 0),
    unit: (unit.length === 0),
    property: (property.length === 0),
    llbroker: (llbroker.length === 0),
    ttbroker: (ttbroker.length === 0),
  };
}

class AddPropertyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: '',
      unit: '',
      property: '',
      llbroker: '',
      ttbroker: '',
      touched: {
        tenant: false,
        unit: false,
        property: false,
        llbroker: false,
        ttbroker: false
      },
      tenantDropdown: [],
      propertyDropdown: [],
      unitDropdown: [],
      llbrokerDropdown: [],
      ttbrokerDropdown: [],
      propertyLoaded: false,
      loaded: false,
    }
  }

  async componentDidMount() {

    await fetch('http://localhost:3000/adddealmodal/tenant', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(tenants => {
        tenants.forEach(element => {
          let dropDownEle = { label: element["tenantname"], value: element };
          this.state.tenantDropdown.push(dropDownEle);
        });      
      })

    await fetch('http://localhost:3000/adddealmodal/property', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(properties => {
        properties.forEach(element => {
          let dropDownEle = { label: element["propertyname"], value: element };
          this.state.propertyDropdown.push(dropDownEle);
        });      
      })

    await fetch('http://localhost:3000/adddealmodal/llbroker', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(llbrokers => {
        llbrokers.forEach(element => {
          let dropDownEle = { label: element["brokername"], value: element };
          this.state.llbrokerDropdown.push(dropDownEle);
        });      
      })

    await fetch('http://localhost:3000/adddealmodal/ttbroker', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(ttbrokers => {
        ttbrokers.forEach(element => {
          let dropDownEle = { label: element["brokername"], value: element };
          this.state.ttbrokerDropdown.push(dropDownEle);
        });      
      })

    this.setState({loaded: true})

  }

  onTenantChange = (event) => {
    this.setState({tenant: event.value.tenantname})
    console.log(this.state.tenant)
  }

  onPropertyChange = (event) => {
    this.setState({
      property: event.value.propertyname,
    })

      fetch('http://localhost:3000/adddealmodal/unit', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          property: event.value.propertyname,
        })
      })
        .then(response => response.json())
        .then(units => {
          units.forEach(element => {
            let dropDownEle = { label: element["unit"], value: element };
            this.state.unitDropdown.push(dropDownEle);
          });  
          this.setState({propertyLoaded: true})
        })
    
  }

  onUnitChange = (event) => {
    this.setState({unit: event.value.unit})
  }

  onLLBrokerChange = (event) => {
    this.setState({llbroker: event.value.brokername})
  }

  onTTBrokerChange = (event) => {
    this.setState({ttbroker: event.value.brokername})
  }

  handleBlur = (field) => (event) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true},
      });   
  }
 
  canBeSubmitted() {
    const errors = validate(this.state.tenant, this.state.unit, this.state.property, this.state.llbroker, this.state.ttbroker);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }


  handleSubmit = (event) => {
    if (!this.canBeSubmitted()) {
      this.setState({
        touched: { ...this.state.touched, 'tenant': true, 'property': true, 'unit': true, 'llbroker': true, 'ttbroker': true}
      })
      event.preventDefault();
      return;

    }

    fetch('http://localhost:3000/dealsedit', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        tenant: this.state.tenant,
        property: this.state.property,
        unit: this.state.unit,
        llbroker: this.state.llbroker,
        ttbroker: this.state.ttbroker,
      })
    })
      .then(response => response.json())
      .then(deal => {
        if(deal) {
          this.props.handlePropertyNoAdd();
        } else { console.log("uhoh")}
      })
    this.stateClear();
  }

  stateClear = () => {
    this.setState({
      touched: false,
      tenant: '',
      unit: '',
      property: '',
      llbroker: '',
      ttbroker: '',
    });
  }

  render() {
    const errors = validate(this.state.tenant, this.state.unit, this.state.property, this.state.llbroker, this.state.ttbroker);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
      return errors[field] && this.state.touched[field];
    }

    const showHideClassName = this.props.show ? 'deal-modal deal-display-block' : 'deal-modal deal-display-none';
    return (
      <div className={showHideClassName}>
        <React.Fragment>
        <section className='deal-modal-main'>
         { this.state.loaded && (
           <React.Fragment>
            <div className="deal-modal-title">Add New Deal</div>,
            <div className="deal-modal-body">

              <p className={shouldMarkError('tenant') ? "deal-input-title-error" : "deal-input-title"}>Tenant Name:</p>
              <Select 
                options={this.state.tenantDropdown}
                className="deal-form-input"
                classNamePrefix="deal-form-input"
                onChange={this.onTenantChange.bind(this)}
                onBlur={this.handleBlur('tenant')}
              />

              <p className={shouldMarkError('property') ? "deal-input-title-error" : "deal-input-title"}>Property:</p>
              <Select 
                options={this.state.propertyDropdown}
                className="deal-form-input"
                classNamePrefix="deal-form-input"
                onChange={this.onPropertyChange.bind(this)}
                onBlur={this.handleBlur('property')}
              />

              { this.state.propertyLoaded ? ([
                  <p className={shouldMarkError('unit') ? "deal-input-title-error" : "deal-input-title"}>Unit:</p>,
                  <Select 
                    options={this.state.unitDropdown}
                    className="deal-form-input"
                    classNamePrefix="deal-form-input"
                    onChange={this.onUnitChange.bind(this)}
                    onBlur={this.handleBlur('unit')}
                  />
                ]) : null }

              <p className={shouldMarkError('llbroker') ? "deal-input-title-error" : "deal-input-title"}>Landlord Broker:</p>
              <Select 
                options={this.state.llbrokerDropdown}
                className="deal-form-input"
                classNamePrefix="deal-form-input"
                onChange={this.onLLBrokerChange.bind(this)}
                onBlur={this.handleBlur('llbroker')}
              />

              <p className={shouldMarkError('ttbroker') ? "deal-input-title-error" : "deal-input-title"}>Tenant Broker:</p>
              <Select 
                options={this.state.ttbrokerDropdown}
                className="deal-form-input"
                classNamePrefix="deal-form-input"
                onChange={this.onTTBrokerChange.bind(this)}
                onBlur={this.handleBlur('ttbroker')}
              />

              <div className="line"></div>
              <div className="buttons">

              { isDisabled ? (
                <input 
                  type="submit" 
                  className="button add-button-error"
                  onClick={ (event) => this.handleSubmit(event)}
                />
              ) : (
                <input 
                  type="submit" 
                  className="button add-button"
                  onClick={ (event) => this.handleSubmit(event)}
                />
              )}

              <input
                type="cancel"
                value="Cancel"
                readOnly
                className="button cancel-button"
                onClick={ (event) => { this.props.handleDealNoAdd(); this.stateClear(); }}
              />

              </div>
            </div>
        </React.Fragment>
       )}
        </section>
        </React.Fragment>
      </div>
    );
  }
};

export default AddPropertyModal;