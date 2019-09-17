import React from 'react';
import './addnegotiationmodal.css';
import Select from 'react-select';
import moment from "moment";

function validateTheSpace(
  propertyname, 
  unit,
  gla, 
  ) { 
    return {
      propertyname: (propertyname.length === 0),
      unit: (unit.length === 0),
      gla: (gla.length === 0),
    };
}

function validateTiming(
  cdate,
  term,
  fdate,
  ) { 
  return {
    cdate: (cdate.length === 0),
    term: (term.length === 0),
    fdate: (fdate.length === 0),
  };
}

function validateFinancialTerms(
  rent1, 
  rent1months,
  ti,
  intcomm,
  extcomm,
  llw,
  gfrent,
  gfrentmonths,
  ) { 
  return {
    rent1: (rent1.length === 0),
    rent1months: (rent1months.length === 0),
    ti: (ti.length === 0),
    intcomm: (intcomm.length === 0),
    extcomm: (extcomm.length === 0),
    llw: (llw.length === 0),
    gfrent: (gfrent.length === 0),
    gfrentmonths: (gfrentmonths.length === 0),
  };
}

class AddNegotiationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalcategory: {
        thespace: false,
        timing: false,
        financialterms: true,
      },
      unit: '',
      propertyname: '',
      gla: '',
      status: '',
      cdate: '',
      term: '',
      expirydate: '',
      expirydateOutput: '',
      fdate: '',
      rent1: '',
      rent1months: '',
      rent1start: '',
      rent1end: '',
      ti: '',
      intcomm: '',
      extcomm: '',
      llw: '',
      gfrent: '',
      gfrentmonths: '',
      gfrentstart: '',
      gfrentend: '',

      touched: {
        unit: false,
        propertyname: false,
        gla: false,
        status: false,
        cdate: false,
        term: false,
        fdate: false,
        rent1: false,
        rent1months: false,
        ti: false,
        intcomm: false,
        extcomm: false,
        llw: false,
        freerent: false,
      },
      propertyDropdown: [],
      unitDropdown: [],
      propertyLoaded: false,
      loaded: false,
    }
  }

  async componentDidMount() {

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
    this.setState({loaded: true})
  }

  onPropertyChange = (event) => {
    this.setState({
      propertyname: event.value.propertyname,
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

  onGLAChange = (event) => {
    this.setState({gla: event.target.value})
  }

  onStatusChange = (event) => {
    this.setState({status: event.target.value})
  }
  
  onCDateChange = (event) => {
    this.setState({cdate: event.target.value})
  }
  
  onTermChange = (event) => {
    this.setState({term: event.target.value})
  }
  
  onRent1Change = (event) => {
    this.setState({
      rent1: event.target.value,
      rent1months: this.state.term,
      rent1start: this.state.cdate,
      rent1end: this.state.expirydate,
    })
  }
  
  onRent1MonthsChange = (event) => {
    this.setState({rent1months: event.target.value})
  }
  
  onFDateChange = (event) => {
    this.setState({fdate: event.target.value})
  }
  
  onTIChange = (event) => {
    this.setState({ti: event.target.value})
  }
  
  onIntCommChange = (event) => {
    this.setState({intcomm: event.target.value})
  }
  
  onExtCommChange = (event) => {
    this.setState({extcomm: event.target.value})
  }
  
  onLLWChange = (event) => {
    this.setState({llw: event.target.value})
  }
  
  onFreeRentChange = (event) => {
    this.setState({gfrent: event.target.value})
  }

  onFreeRentMonthsChange = (event) => {
    let gfrentstartMoment = moment(this.state.cdate, 'YYYY-MM-DD');
    let gfrentstart = moment(gfrentstartMoment).format('YYYY-MM-DD');
    let gfrentend = gfrentstartMoment.add(event.target.value, 'months').format('YYYY-MM-DD');
    this.setState({
      gfrentmonths: event.target.value,
      gfrentstart: gfrentstart,
      gfrentend: gfrentend,
    })
  }

  handleBlur = (field) => (event) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true},
      });   
      if((field === 'cdate') || (field === 'term')) {
        if (this.state.cdate && this.state.term) {
          let cdateMoment = moment(this.state.cdate, 'YYYY-MM-DD');
          let expirydate = cdateMoment.add(this.state.term, 'months').subtract(1, 'days').format('YYYY-MM-DD');
          let expirydateOutput = moment(expirydate).format('YYYY-MM-DD');
          this.setState({ expirydate: expirydate })
          this.setState({ expirydateOutput: expirydateOutput})
        }
      }
  }

  canNextTheSpace() {
    const errors = validateTheSpace(this.state.propertyname, this.state.unit, this.state.gla);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  canNextTiming() {
    const errors = validateTiming(this.state.cdate, this.state.term, this.state.fdate);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  canBeSubmitted() {
    const errors = validateFinancialTerms(this.state.rent1, this.state.rent1months, this.state.ti, this.state.intcomm, this.state.extcomm, this.state.llw, this.state.gfrent, this.state.gfrentmonths);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleSubmit = (event) => {
    if (!this.canBeSubmitted()) {
      this.setState({
        touched: { ...this.state.touched, 'rent1': true, 'rent1months': true, 'ti': true, 'intcomm': true, 'extcomm': true, 'llw': true, 'gfrent': true, 'gfrentmonths': true}
      })
      event.preventDefault();
      return;
    }

    const fetchURL = `http://localhost:3000/dealneg/${this.props.dealid}`;
    fetch(fetchURL, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        dealid: this.props.dealid,
        propertyname: this.state.propertyname,
        unit: this.state.unit,
        gla: this.state.gla,
        status: this.state.status,
        /* add active */
        cdate: this.state.cdate,
        fdate: this.state.fdate,
        rent1: this.state.rent1,
        rent1start: this.state.rent1start,
        rent1months: this.state.rent1months,
        rent1end: this.state.rent1end,
        ti: this.state.ti,
        intcomm: this.state.intcomm,
        extcomm: this.state.extcomm,
        llw: this.state.llw,
        gfrent: this.state.gfrent,
        gfrentstart: this.state.gfrentstart,
        gfrentend: this.state.gfrentend,
      })
    })
      .then(response => response.json())
      .then(dealneg => {
        if(dealneg) {
          this.props.handleNegNoAdd();
          this.props.loadDeal();
        } else { console.log("failure")}
      })
    this.stateClear();
  }

  handleNext = (event) => {
    if(this.state.modalcategory['thespace']) {
      if (!this.canNextTheSpace()) {
        this.setState({
          touched: { ...this.state.touched, 'property': true, 'unit': true, 'gla': true}
        })
        event.preventDefault();
        return;
      } else {
        this.setState({
          modalcategory: { ...this.state.modalcategory, 'timing': true, 'thespace': false}
        })
      }
    } else if (this.state.modalcategory['timing']) {
      if (!this.canNextTiming()) {
        this.setState({
          touched: { ...this.state.touched, 'fdate': true, 'cdate': true, 'term': true, 'expirydate': true}
        })
        event.preventDefault();
        return;
      } else { 
        this.setState({
          modalcategory: { ...this.state.modalcategory, 'financialterms': true, 'timing': false}
        })
        event.preventDefault();
        return;
      }
    }
  }

  handleBack = () => {
    if(this.state.modalcategory['timing']) {
      this.setState({
        modalcategory: { ...this.state.modalcategory, 'timing': false, 'thespace': true}
      })
    } else if (this.state.modalcategory['financialterms']) {
      this.setState({
        modalcategory: { ...this.state.modalcategory, 'financialterms': false, 'timing': true}
      })
    }
  }

  stateClear = () => {
    this.setState({
      modalcategory: {
        thespace: true,
        timing: false,
        financialterms: false,
      },
      unit: '',
      propertyname: '',
      gla: '',
      status: '',
      cdate: '',
      term: '',
      expirydate: '',
      fdate: '',
      rent1: '',
      rent1months: '',
      rent1start: '',
      rent1end: '',
      ti: '',
      intcomm: '',
      extcomm: '',
      llw: '',
      gfrent: '',
      gfrentstart: '',
      gfrentend: '',

      touched: {
        unit: false,
        propertyname: false,
        gla: false,
        status: false,
        cdate: false,
        term: false,
        fdate: false,
        rent1: false,
        rent1months: false,
        ti: false,
        intcomm: false,
        extcomm: false,
        llw: false,
      },
      propertyLoaded: false,
    })
  }

  render() {
    const errorsTheSpace = validateTheSpace(this.state.propertyname, this.state.unit, this.state.gla);
    const errorsTiming = validateTiming(this.state.cdate, this.state.term, this.state.fdate);
    const errorsFinancialTerms = validateFinancialTerms(this.state.rent1, this.state.rent1months, this.state.ti, this.state.intcomm, this.state.extcomm, this.state.llw, this.state.gfrent, this.state.gfrentmonths);
    
    const isTheSpaceDisabled = Object.keys(errorsTheSpace).some(x => errorsTheSpace[x]);
    const isTimingDisabled = Object.keys(errorsTiming).some(x => errorsTiming[x]);
    const isFinancialTermsDisabled = Object.keys(errorsFinancialTerms).some(x => errorsFinancialTerms[x]);

    const shouldMarkTheSpaceError = (field) => {
      return errorsTheSpace[field] && this.state.touched[field];
    }

    const shouldMarkTimingError = (field) => {
      return errorsTiming[field] && this.state.touched[field];
    }

    const shouldMarkFinancialTermsError = (field) => {
      return errorsFinancialTerms[field] && this.state.touched[field];
    }


    const showHideClassName = this.props.show ? 'neg-modal display-block' : 'neg-modal display-none';
    return (
      <div className={showHideClassName}>
        <React.Fragment>
         { this.state.loaded && (
           <div className='neg-modal-main'>
              <div className="neg-modal-title">Add New Stage of Negotiation</div>
              <div className="neg-modal-body">
              <div className="neg-modal-body-header">
                    <p className={ this.state.modalcategory['thespace'] ? "neg-header-sub active-sub" : "neg-header-sub"}>1. The Space</p>
                    <p className={ this.state.modalcategory['timing'] ? "neg-header-sub active-sub" : "neg-header-sub"}>2. Timing</p>
                    <p className={ this.state.modalcategory['financialterms'] ? "neg-header-sub active-sub" : "neg-header-sub"}>3. Financial Terms</p>
                  </div>
                { this.state.modalcategory['thespace'] ? (
                  <React.Fragment>
                  
                  <div className="neg-boxcontainer">
                    <div className="leftbox">
                      <p className={shouldMarkTheSpaceError('property') ? "input-title-error" : "input-title"}>Property:</p>
                      <Select 
                        options={this.state.propertyDropdown}
                        className="neg-form-input"
                        classNamePrefix="neg-form-input"
                        onChange={this.onPropertyChange}
                        onBlur={this.handleBlur('property')}
                      />

                    { this.state.propertyLoaded ? ([
                        <p className={shouldMarkTheSpaceError('unit') ? "input-title-error" : "input-title"}>Unit:</p>,
                        <Select 
                          options={this.state.unitDropdown}
                          className="neg-form-input"
                          classNamePrefix="neg-form-input"
                          onChange={this.onUnitChange}
                          onBlur={this.handleBlur('unit')}
                        />
                      ]) : null }
                    </div>
                    <div className="rightbox">
                      <p className={shouldMarkTheSpaceError('gla') ? "input-title-error" : "input-title"}>GLA:</p>
                      <input 
                        type="input"
                        value={this.state.gla}
                        className="neg-form-input"
                        onChange={this.onGLAChange}
                        onBlur={this.handleBlur('gla')}
                      />
                      <p className={shouldMarkTheSpaceError('status') ? "input-title-error" : "input-title"}>Negotiation Round:</p>
                      <input 
                        type="input"
                        value={this.state.status}
                        className="neg-form-input"
                        onChange={this.onStatusChange}
                        onBlur={this.handleBlur('status')}
                      />
                    </div>
                  </div>
                  </React.Fragment>
                ) : this.state.modalcategory['timing'] ? (
                  <React.Fragment>
                  <div className="neg-boxcontainer">
                    <div className="leftbox">
                      <p className={shouldMarkTimingError('cdate') ? "input-title-error" : "input-title"}>Commencement Date: (YYYY-MM-DD)</p>
                      <input
                        type="input"
                        value={this.state.cdate}
                        className="neg-form-input"
                        onChange={this.onCDateChange}
                        onBlur={this.handleBlur('cdate')}
                      />
                      <p className={shouldMarkTimingError('fdate') ? "input-title-error" : "input-title"}>Fixturing Start Date: (YYYY-MM-DD)</p>
                      <input
                        type="input"
                        value={this.state.fdate}
                        className="neg-form-input"
                        onChange={this.onFDateChange}
                        onBlur={this.handleBlur('fdate')}
                      />
                    </div>
                    <div className="rightbox">
                      <p className={shouldMarkTimingError('term') ? "input-title-error" : "input-title"}>Term (months):</p>
                      <input
                        type="input"
                        value={this.state.term}
                        className="neg-form-input"
                        onChange={this.onTermChange}
                        onBlur={this.handleBlur('term')}
                      />
                      <p className="input-title">Expiry Date: (YYYY-MM-DD)</p>
                      <input
                        type="input"
                        value={this.state.expirydateOutput}
                        placeholder={this.state.expirydateOutput}
                        className="neg-form-input"
                      />
                    </div>
                  </div>
                  </React.Fragment>
                  ) : (
                  <React.Fragment>
                  <div className="neg-boxcontainer">
                    <div className="leftbox">
                      <p className={shouldMarkFinancialTermsError('rent') ? "input-title-error" : "input-title"}>Rent:</p>
                      <div className="input-box-container">
                        <div className="input-box-left">
                          <p className="input-subtitle">PSF Amount:</p>
                        </div>
                        <div className="input-box-right">
                          <input
                            type="input"
                            value={this.state.rent1}
                            className="neg-form-input"
                            onChange={this.onRent1Change}
                            onBlur={this.handleBlur('rent1')}
                          />
                        </div>
                        <div className="input-box-left">
                          <p className="input-subtitle">Months:</p>
                        </div>
                        <div className="input-box-right">
                          <input
                            type="input"
                            value={this.state.rent1months}
                            placeholder={this.state.rent1months}
                            className="neg-form-input"
                          />
                        </div>
                      </div>
                      <p className={shouldMarkFinancialTermsError('ti') ? "input-title-error" : "input-title"}>TI PSF:</p>
                      <input
                        type="input"
                        value={this.state.ti}
                        className="neg-form-input"
                        onChange={this.onTIChange}
                        onBlur={this.handleBlur('ti')}
                      />
                      <p className={shouldMarkFinancialTermsError('llw') ? "input-title-error" : "input-title"}>LLW:</p>
                      <input
                        type="input"
                        value={this.state.llw}
                        className="neg-form-input"
                        onChange={this.onLLWChange}
                        onBlur={this.handleBlur('llw')}
                      />
                    </div>
                    <div className="rightbox">
                      <p className={shouldMarkFinancialTermsError('extcomm') ? "input-title-error" : "input-title"}>External Commission:</p>
                      <input
                        type="input"
                        value={this.state.extcomm}
                        className="neg-form-input"
                        onChange={this.onExtCommChange}
                        onBlur={this.handleBlur('extcomm')}
                      />
                      <p className={shouldMarkFinancialTermsError('intcomm') ? "input-title-error" : "input-title"}>Internal Commission:</p>
                      <input
                        type="input"
                        value={this.state.intcomm}
                        className="neg-form-input"
                        onChange={this.onIntCommChange}
                        onBlur={this.handleBlur('intcomm')}
                      />
                      <p className={shouldMarkFinancialTermsError('gfrent') ? "input-title-error" : "input-title"}>Free Rent:</p>
                      <div className="input-box-container">
                        <div className="input-box-left">
                          <p className="input-subtitle">PSF Amount:</p>
                        </div>
                        <div className="input-box-right">
                          <input
                            type="input"
                            className="neg-form-input-small"
                            onChange={this.onFreeRentChange}
                            onBlur={this.handleBlur('gfrent')}
                          />
                        </div>
                        <div className="input-box-left">
                          <p className="input-subtitle"># of Months:</p>
                        </div>
                        <div className="input-box-right">
                          <input
                            type="input"
                            className="neg-form-input-small"
                            onChange={this.onFreeRentMonthsChange}
                            onBlur={this.handleBlur('gfrentmonths')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  </React.Fragment>
                  )}
                  

                  <div className="line"></div>
                  <div className="neg-buttons">
                    <div className="left">
                      { !this.state.modalcategory['thespace'] && (
                        <input 
                          type="back"
                          value="Back" 
                          className="button cancel-button float-left"
                          onClick={ (event) => this.handleBack(event)}
                        />
                      )}
                    </div>
                    <div className="right">

                      { ((this.state.modalcategory['thespace'] && isTheSpaceDisabled) || (this.state.modalcategory['timing'] && isTimingDisabled)) && (
                          <input 
                            type="next"
                            value="Next" 
                            className="button add-button-error float-right"
                            onClick={ (event) => this.handleNext(event)}
                          />
                      )}

                      { (this.state.modalcategory['financialterms'] && isFinancialTermsDisabled) && (
                          <input 
                            type="submit"
                            value="Submit" 
                            className="button add-button-error float-right"
                            onClick={ (event) => this.handleSubmit(event)}
                          />
                      )} 

                      { ((this.state.modalcategory['thespace'] && !isTheSpaceDisabled) || (this.state.modalcategory['timing'] && !isTimingDisabled)) && (
                          <input 
                            type="next"
                            value="Next" 
                            className="button add-button float-right"
                            onClick={ (event) => this.handleNext(event)}
                          />
                      )}

                      { (this.state.modalcategory['financialterms'] && !isFinancialTermsDisabled) && (
                          <input 
                            type="submit"
                            value="Submit" 
                            className="button add-button float-right"
                            onClick={ (event) => this.handleSubmit(event)}
                          />
                      )}

                      <input
                        type="cancel"
                        value="Cancel"
                        className="button cancel-button float-right"
                        onClick={ (event) => { this.props.handleNegNoAdd(); this.stateClear(); }}
                      />
                    </div>
                  </div>
              </div>
          </div>
         )}
        </React.Fragment>
      </div>
    );
  }
};

export default AddNegotiationModal;