import React from "react";
import "./AddPropertyModal.css";

function validate(propertyname, address, city, rentablearea, storeys) {
  return {
    propertyname: propertyname.length === 0,
    address: address.length === 0,
    city: city.length === 0,
    rentablearea: validateNumber(rentablearea),
    storeys: validateNumber(storeys)
  };
}

function validateNumber(input) {
  var number = /^\d+$/;
  return !(number.test(input) && input.length > 1);
}

class AddPropertyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyname: "",
      address: "",
      city: "",
      rentablearea: "",
      storeys: "",
      siteareasf: "",
      yearbuilt: "",
      yearacquired: "",
      units: [],
      fetchDone: false,
      touched: {
        propertyname: false,
        address: false,
        city: false,
        rentablearea: false,
        storeys: false,
        siteareasf: false,
        yearbuilt: false,
        yearacquired: false
      }
    };

    this.onChange = this.onChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stateClear = this.stateClear.bind(this);
  }

  onChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleBlur = field => event => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  canBeSubmitted() {
    const errors = validate(
      this.state.propertyname,
      this.state.address,
      this.state.city,
      this.state.rentablearea,
      this.state.storeys
    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleSubmit = event => {
    if (!this.canBeSubmitted()) {
      this.setState({
        touched: {
          ...this.state.touched,
          propertyname: true,
          city: true,
          address: true,
          rentablearea: true,
          storeys: true
        }
      });
      event.preventDefault();
      return;
    }

    for (var i = 1; i <= this.state.storeys; i++) {
      this.state.units.push(`${i}00`);
    }

    fetch("https://intense-temple-63357.herokuapp.com/propertyedit", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyname: this.state.propertyname,
        address: this.state.address,
        city: this.state.city,
        rentablearea: this.state.rentablearea,
        storeys: this.state.storeys,
        siteareasf: this.state.siteareasf,
        yearbuilt: this.state.yearbuilt,
        yearacquired: this.state.yearacquired
      })
    })
      .then(response => response.json())
      .then(property => {
        if (property) {
          this.props.handlePropertyNoAdd();
          fetch("https://intense-temple-63357.herokuapp.com/units", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              propertyname: property.propertyname,
              units: this.state.units,
              rentablearea: property.rentablearea,
              storeys: property.storeys
            })
          });
        }
      });
    /**/

    this.stateClear();
  };

  stateClear = () => {
    this.setState({
      touched: false,
      propertyname: "",
      address: "",
      city: "",
      rentablearea: "",
      storeys: "",
      siteareasf: "",
      yearbuilt: "",
      yearacquired: ""
    });
  };

  render() {
    const errors = validate(
      this.state.propertyname,
      this.state.address,
      this.state.city,
      this.state.rentablearea,
      this.state.storeys
    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = field => {
      return errors[field] && this.state.touched[field];
    };

    const showHideClassName = this.props.show
      ? "property-modal property-display-block"
      : "property-modal property-display-none";
    return (
      <div className={showHideClassName}>
        <React.Fragment>
          <section className="property-modal-main">
            <React.Fragment>
              <div className="property-modal-title">Add New Property</div>,
              <div className="property-modal-body">
                <p
                  className={
                    shouldMarkError("propertyname")
                      ? "property-input-title-error"
                      : "property-input-title"
                  }
                >
                  Property Name:
                </p>
                <input
                  type="input"
                  className="property-form-input"
                  value={this.state.propertyname}
                  onChange={this.onChange("propertyname")}
                  onBlur={this.handleBlur("propertyname")}
                />

                <p
                  className={
                    shouldMarkError("address")
                      ? "property-input-title-error"
                      : "property-input-title"
                  }
                >
                  Address:
                </p>
                <input
                  type="input"
                  className="property-form-input"
                  value={this.state.address}
                  onChange={this.onChange("address")}
                  onBlur={this.handleBlur("address")}
                />

                <p
                  className={
                    shouldMarkError("city")
                      ? "property-input-title-error"
                      : "property-input-title"
                  }
                >
                  City:
                </p>
                <input
                  type="input"
                  className="property-form-input"
                  value={this.state.city}
                  onChange={this.onChange("city")}
                  onBlur={this.handleBlur("city")}
                />

                <p
                  className={
                    shouldMarkError("rentablearea")
                      ? "property-input-title-error"
                      : "property-input-title"
                  }
                >
                  Rentable Area:
                </p>
                <input
                  type="input"
                  className="property-form-input"
                  value={this.state.rentablearea}
                  onChange={this.onChange("rentablearea")}
                  onBlur={this.handleBlur("rentablearea")}
                />
                {shouldMarkError("rentablearea") ? (
                  <p className="addprop_error_text">
                    Please input an integer value.
                  </p>
                ) : null}

                <p
                  className={
                    shouldMarkError("storeys")
                      ? "property-input-title-error"
                      : "property-input-title"
                  }
                >
                  Storeys:
                </p>
                <input
                  type="input"
                  className="property-form-input"
                  value={this.state.storeys}
                  onChange={this.onChange("storeys")}
                  onBlur={this.handleBlur("storeys")}
                />
                {shouldMarkError("storeys") ? (
                  <p className="addprop_error_text">
                    Please input an integer value.
                  </p>
                ) : null}

                <p
                  className={
                    shouldMarkError("siteareasf")
                      ? "property-input-title-error"
                      : "property-input-title"
                  }
                >
                  Site Area SF:
                </p>
                <input
                  type="input"
                  className="property-form-input"
                  value={this.state.siteareasf}
                  onChange={this.onChange("siteareasf")}
                  onBlur={this.handleBlur("siteareasf")}
                />

                <p
                  className={
                    shouldMarkError("yearbuilt")
                      ? "property-input-title-error"
                      : "property-input-title"
                  }
                >
                  Year Built:
                </p>
                <input
                  type="input"
                  className="property-form-input"
                  value={this.state.yearbuilt}
                  onChange={this.onChange("yearbuilt")}
                  onBlur={this.handleBlur("yearbuilt")}
                />

                <p
                  className={
                    shouldMarkError("yearacquired")
                      ? "property-input-title-error"
                      : "property-input-title"
                  }
                >
                  Year Acquired:
                </p>
                <input
                  type="input"
                  className="property-form-input"
                  value={this.state.yearacquired}
                  onChange={this.onChange("yearacquired")}
                  onBlur={this.handleBlur("yearacquired")}
                />

                <div className="line"></div>
                <div className="buttons">
                  {isDisabled ? (
                    <input
                      type="submit"
                      className="button add-button-error"
                      onClick={event => this.handleSubmit(event)}
                    />
                  ) : (
                    <input
                      type="submit"
                      className="button add-button"
                      onClick={event => this.handleSubmit(event)}
                    />
                  )}

                  <input
                    type="cancel"
                    value="Cancel"
                    readOnly
                    className="button cancel-button"
                    onClick={event => {
                      this.stateClear();
                      this.props.handlePropertyNoAdd();
                    }}
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
}

export default AddPropertyModal;
