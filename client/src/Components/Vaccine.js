import React , { useRef , useEffect ,useState } from 'react'
//import ReactDOM from 'react-dom';
import axios from 'axios';
import {Radio, Switch} from 'pretty-checkbox-react';
// import { RiCheckboxCircleLine } from 'react-icons/ri'

import '@djthoms/pretty-checkbox';
import '../css/vaccine.css'

var ST = 0 , FV = 0 , HD = 0 , CO = 0 , DB = 0;
let setST = () => {ST = 1 - ST;}
let setFV = () => {FV = 1 - FV;}
let setHD = () => {HD = 1 - HD;}
let setCO = () => {CO = 1 - CO;}
let setDB = () => {DB = 1 - DB;}
class Vaccine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name : null , email : null , state_ : "" , mobile : 0 , age : 0 , pincode : ""}
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value});
    }
    handleSubmit = (e) => {

        e.preventDefault();
        // console.log(this.state);
        //console.log(ST , CO , DB , FV , HD);
        const data = [CO , FV , ST , DB , HD];
        var total = 0 , dist = 0 , perc = 0;
        console.log(data);

        axios.get("https://api.covid19india.org/state_district_wise.json").then(res => {
            dist = res.data[this.state.state_].districtData[this.state.pincode].active;
            for(var key in res.data[this.state.state_].districtData) {
                for(var key1 in res.data[this.state.state_].districtData[key]) {
                    if(key1 == "active") {
                        total += res.data[this.state.state_].districtData[key][key1];
                        break;
                    }
                }
            }
            perc = dist / total;
            console.log(perc);
        })
        .catch(err => {
            console.log("Enter Again!!!!");
            console.log(err);
        })

        axios.post('http://127.0.0.1:5000/' , data)
        .then(res => {
            const user = [this.state.name , this.state.email , this.state.mobile , this.state.state_ , this.state.pincode , perc , res.data];
            axios.post('http://127.0.0.1:5000/insert' , user)
            .then(res => {
                console.log(res);
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    l
    render()
    {
        return(
        <div className = "form">
                <div className = "ADtls">
                    <div className = "h3">
                        <h3 style = {{textAlign : "center"}}>General Details</h3>
                    </div>
                    <div className = "AForm">
                        <div className = "fdtl input-container">
                            <input type="text" required="" name = "name" onChange = {this.handleChange}/>
                            <label className="detail">Full Name</label>
                        </div>
                        <div className = "fdtl input-container">
                            <input type="text" required=""/>
                                <label className="detail">Address</label>
                        </div>
                        <div className = "fdtl input-container">
                            <input type="text" required="" name = "state_" onChange = {this.handleChange}/>
                                <label className="detail">State</label>
                        </div>
                            {/* <div className = "fdtl input-container">
                                <input type="text" required=""/>
                                <label>West Bengal</label>
                            </div> */}
                        <div className = "fdtl input-container">
                            <input type="text" required="" name = "pincode" onChange = {this.handleChange}/>
                                <label className="detail">District</label>
                        </div>
                        <div className = "fdtl input-container">
                            <input type="text" required="" name = "email" onChange = {this.handleChange}/>
                                <label className="detail">Email Address</label>
                        </div>
                        <div className = "fdtl input-container">
                            <input type="text" required="" name = "mobile" onChange = {this.handleChange}/>
                                <label className="detail">Mobile Number</label>
                        </div>
                        <div className = "fdtl input-container">
                            <input type="text" required=""/>
                                <label className="detail">Age</label>
                        </div>
                    </div>
                </div>
                    <div className = "HDtls">
                        <div className = "h3">
                            <h3 style = {{textAlign : "center"}}>Health Details</h3>
                        </div>
                        <div>
                            <div className = "form1a">
                                <Switch shape="round" color="black" icon={<i className="mdi mdi-check"/>} animation="smooth" className = "sy" onClick = {setST}>Do you have a sore throat?</Switch><br></br>
                                <Switch shape="round" color="black" icon={<i className="mdi mdi-check"/>} animation="smooth" className = "sy" onClick = {setCO}>Do you have a cough?</Switch><br></br>
                                {/* <Switch shape="round" color="success" icon={<i className="mdi mdi-check"/>} animation="smooth" className = "sy">Do you have Fever ?</Switch> */}
                                <Switch shape="round" color="black" icon={<i className="mdi mdi-check"/>} animation="smooth" className = "sy" onClick = {setDB}>Do you have difficulty in breathing?</Switch><br></br>
                                <Switch shape="round" color="black" icon={<i className="mdi mdi-check"/>} animation="smooth" className = "sy" onClick = {setFV}>Do you have a fever?</Switch><br></br>
                                {/* <Switch shape="round" color="success" icon={<i className="mdi mdi-check"/>} animation="smooth" className = "sy">Do you have Cough ?</Switch> */}
                                <Switch shape="round" color="black" icon={<i className="mdi mdi-check"/>} animation="smooth" className = "sy" onClick = {setHD}>Do you have a headache?</Switch> <br></br>
                            </div>
                            <div className = "form1b">
                                <div>
                                    {/* <Switch shape="round" color="success" icon={<i className="mdi mdi-check"/>} animation="smooth" className = "sy">Do you have Cough ?</Switch> */}
                                    <Switch shape = "slim" className = "sy">Any History of Diabetes</Switch><br></br>
                                    <Switch shape = "slim" className = "sy">Any History of Hypertension</Switch><br></br>
                                    <Switch shape = "slim" className = "sy">Any History of Lung Disease</Switch><br></br>
                                    <Switch shape = "slim" className = "sy">Any History of Heart Disease</Switch><br></br>
                                    <Switch shape = "slim" className = "sy">Any History of Kidney Disorder</Switch><br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                <div>
                    <div className="button_cont" align="center"><a className="example_d" onClick = {this.handleSubmit}>Submit</a></div>
                </div>
            </div>
            )
       }
}
export default Vaccine;