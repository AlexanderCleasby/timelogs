import React from "react";

export default props => {
  
  return (
    <div className="form-row">
      <label className="col col-form-label">{props.label}</label>
      <select
        className="col form-control"
        name="hour"
        value={props.time.getHours()>12 ? props.time.getHours()-12 : props.time.getHours()}
        onChange={e => props.change(props.label, e)}
      >
        {[...Array(12).keys()].map(x => (
          <option key={x} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      :
      <select
        className="col form-control"
        name="min"
        value={props.time.getMinutes()}
        onChange={e => props.change(props.label, e)}
      >
        {[...Array(60).keys()].map(x => (
          <option key={x} value={x}>
            {`${x}`.padStart(2, "0")}
          </option>
        ))}
      </select>
      <select
        className="col form-control"
        name="AMPM"
        onChange={e => props.change(props.label, e)}
        value={props.time.getHours()<12?"AM":"PM"}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};
