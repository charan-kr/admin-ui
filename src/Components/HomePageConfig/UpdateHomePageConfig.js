import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import axios from "axios";
import { Toast } from "primereact/toast";
import {HomePageConfigService} from "../../service/HomePageConfigService";

class UpdateHomePageConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdBy: "Bhanu",
      createdDt:"20-12-2020 02:02 AM",
      modifiedBy: "Bhanu",
      modifiedDt: "21-12-2020 02:02 AM",
      configName: "1",
      eventName: "Event",
      id:"",
      palettes: [
        {
          type: "",
          count:"",
          header:{
            text: "",
            link: "",
            align: "",
          },
          footer:{
            text: "",
            link: "",
            align: "",
          },
          subSections: [
            {
              link:"",
              header:{
                text: "",
                link: "",
                align: "",
              },
              footer:{
                text: "",
                link: "",
                align: "",
              },
              images: [
                {
                  url:"",
                  link:"",
                  width: "",
                  height: "",
                  header:{
                    text: "",
                    link: "",
                    align: "",
                  },
                  footer:{
                    text: "",
                    link: "",
                    align: "",
                  },
                },
              ],
            },
          ],
        }
        
      ],

      errors: [
       
      ]
      
    };

    this.type = [
        { value: "Scroll", name: "Scroll" },
        { value: "Rotate", name: "Rotate" },
      ];
      this.halign = [
        { name: "Left", value: "Left" },
        { name: "Middle", value: "Middle" },
        { name: "Right", value: "Right" },
      ];
  
      this.footer = [
        { name: "Left", value: "Left" },
        { name: "Middle", value: "Middle" },
        { name: "Right", value: "Right" },
      ];
      this.data = [
        {
          value: "Left",
          label: "Left",
        },
        {
          value: "Middle",
          label: "Middle",
        },
        {
          value: "Right",
          label: "Right",
        },
      ];
      this.HomePageConfigService = new HomePageConfigService();

}

componentDidMount(){
  this.HomePageConfigService.getHomePageConfigDetailsById(this.props.match.params.id);
  axios
    .get("http://localhost:8000/app/palette/"+this.props.match.params.id)
    .then((res) => {
      
      this.setState(
       { palettes:res.data.palettes,id:res.data.id}
       
      )
      this.setState({},()=>{
        this.state.palettes.map((el,i)=>{
          this.state.errors.push(
            {
              type: "",
              count:"",
              header:{
                text: "",
                link: "",
                align: "",
              },
              footer:{
                text: "",
                link: "",
                align: "",
              },
              subSections: []
            }
          )
          this.setState({})
        })
      
        this.state.palettes.map((el,i)=>{
          el.subSections.map((els,j)=>{
            this.state.errors[i].subSections.push(
              {
                link:"",
                header:{
                  text: "",
                  link: "",
                  align: "",
                },
                footer:{
                  text: "",
                  link: "",
                  align: "",
                },
                images:[]
              }
            )
          })
        })
      
        this.state.palettes.map((el,i)=>{
          el.subSections.map((els,j)=>{
            els.images.map((elss,k)=>{
              this.state.errors[i].subSections[j].images.push(
                      {
                        url:"",
                        link:"",
                        width: "",
                        height: "",
                        header:{
                          text: "",
                          link: "",
                          align: "",
                        },
                        footer:{
                          text: "",
                          link: "",
                          align: "",
                        },
                      }
              )
              this.setState({})
            })
          })
        })
      })
    })
    .catch((error) => {
      alert("error");
      console.log(error);
      alert("This is error"+error);
    });
  

}
  createUI() {
    return this.state.palettes.map((el, i) => (
      <div className="accordion-demo">
        <Accordion activeIndex={1}>
          <AccordionTab header={"Row" + (i + 1)}>
            <div key={i}>
              <div className="container">
                <div className="p-field p-grid p-ml-5">
                  <label>
                    <b>Type:</b>
                  </label>
                  <Dropdown
                  style={{ width: "190px", marginLeft: "3.8em" }}
                    value={el.type}
                    options={this.type}
                    optionLabel="name"
                    name="type"
                    onChange={this.handleChange.bind(this, i)}
                    placeholder="Select a Type"
                    className={this.state.errors[i] ? (this.state.errors[i].type) :""}
                  />
                </div>


                <div className="p-field p-grid">
                  <label
                    htmlFor="Header"
                    className="p-col-fixed"
                    style={{ width: "100px", marginLeft: "2em" }}
                  >
                    <b>Header:</b>
                  </label>
                  <div className="p-col-7">

                    <InputText
                      name="text"
                      value={el.header.text}
                      className="p-mr-2 p-d-inline"
                      placeholder="Header"
                      className={this.state.errors[i]? this.state.errors[i].header.text :""}
                      onChange={this.handleChangeHeader.bind(this, i)}
                    />

                    <InputText
                      name="link"
                      value={el.header.link}
                      className="p-mr-2 p-d-inline"
                      placeholder="Hyperlink"
                      className={this.state.errors[i] ? this.state.errors[i].header.link:""}
                      style={{marginLeft:"1em"}}
                      onChange={this.handleChangeHeader.bind(this, i)}
                    />
                    <Dropdown
                      value={el.header.align}
                      options={this.halign}
                      className={this.state.errors[i] ? this.state.errors[i].header.align:""}
                      onChange={this.state.errors[i] ? this.handleChangeHeader.bind(this, i) :""}
                      name="align"
                      optionLabel="name"
                      scrollHeight="100px"
                      style={{width:"150px",marginLeft:"10px"}}
                      placeholder="Select Header"
                    />                    
                  </div>
                </div>
                <div className="p-field p-grid">
                </div>

                <div className="p-field p-grid">
                  <label
                    htmlFor="Footer"
                    className="p-col-fixed"
                    style={{ width: "100px", marginLeft: "2em" }}
                  >
                    <b>Footer:</b>
                  </label>
                  <div className="p-col-7">
                    
                    <InputText
                      name="text"
                      value={el.footer.text}
                      placeholder="Textbox"
                      className={this.state.errors[i] ? this.state.errors[i].footer.text:""}
                      onChange={this.handleChangeFooter.bind(this, i)}
                    />
                    
                    <InputText
                      name="link"
                      value={el.footer.link}
                      
                      placeholder="Hyperlink"
                      className={this.state.errors[i] ? this.state.errors[i].footer.text:""}
                      style={{marginLeft:"1em"}}
                      onChange={this.handleChangeFooter.bind(this, i)}
                    />
                    
                    
                    <Dropdown
                      value={el.footer.align}
                      options={this.footer}
                      optionLabel="name"
                      className={this.state.errors[i] ? this.state.errors[i].footer.align:""}
                      onChange={this.handleChangeFooter.bind(this, i)}
                      name="align"
                      placeholder="Select Footer"
                      scrollHeight="100px"
                      style={{width:"150px", marginLeft:"10px"}}
                    />
                  </div>
                </div>
              </div>
              <div>{this.subUi(el.subSections, i)}</div>

              <div className="p-field p-grid">
              <Button className="p-m-2"
              style={{marginRight:"100em"}}
              onClick={this.removeRow.bind(this,i)}
               >
                 Remove Row
               </Button>
              
              <div style={{marginLeft:"41em"}}>
               <Button
                  className="p-m-2"
                  value="Add"
                  onClick={this.addSubClick.bind(this, i)}
                >
                  Add Section
               </Button>
               </div>
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    ));
  }

  
  handleChange(i, event) {
    const { name, value } = event.target;
    let list = [...this.state.palettes];
    list[i][name] = value;
    this.setState({ list });
    this.state.errors[i][name]=value.length === 0 ? "p-invalid" : "";
  }

  handleChangeHeader(i, event) {
    const { name, value } = event.target;
    let list = [...this.state.palettes];
    list[i].header[name] = value;
    this.setState({ list });
    if(name=="align"){this.state.errors[i].header[name]=value.length === 0 ? "p-invalid" : "";}
    else{this.state.errors[i].header[name]=value.length === 0 ? "p-invalid" : "";}
  }

  handleChangeFooter(i, event) {
    const { name, value } = event.target;
    let list = [...this.state.palettes];
    list[i].footer[name] = value;
    this.setState({ list });
    if(name=="align"){this.state.errors[i].footer[name]=value.length === 0 ? "p-invalid" : "";}
    else{this.state.errors[i].footer[name]=value.length === 0 ? "p-invalid" : "";}
  }

  addClick() {
    this.setState((prevState) => ({
      palettes: [
        ...prevState.palettes,
        {
            type: "",
            count:"",
            header:{
              text: "",
              link: "",
              align: "",
            },
            footer:{
              text: "",
              link: "",
              align: "",
            },
            subSections: [
              {
                link:"",
                header:{
                  text: "",
                  link: "",
                  align: "",
                },
                footer:{
                  text: "",
                  link: "",
                  align: "",
                },
                images: [
                  {
                    url:"",
                    link:"",
                    width: "",
                    height: "",
                    header:{
                      text: "",
                      link: "",
                      align: "",
                    },
                    footer:{
                      text: "",
                      link: "",
                      align: "",
                    },
                  },
                ],
              },
            ],
          },
      ],
    }));

    this.state.errors.push(
      {
        type: "",
        count:"",
        header:{
          text: "",
          link: "",
          align: "",
        },
        footer:{
          text: "",
          link: "",
          align: "",
        },
        subSections: [
          {
            link:"",
            header:{
              text: "",
              link: "",
              align: "",
            },
            footer:{
              text: "",
              link: "",
              align: "",
            },
            images: [
              {
                url:"",
                link:"",
                width: "",
                height: "",
                header:{
                  text: "",
                  link: "",
                  align: "",
                },
                footer:{
                  text: "",
                  link: "",
                  align: "",
                },
              },
            ],
          },
        ],
      }
    )
}

removeRow(i){
  if(this.state.palettes.length>1){
  this.state.palettes.splice(i,1)
  this.state.errors.splice(i,1)
  this.setState(this.state)
  }
}

subUi(fv, i) {
    return fv.map((els, j) => (
      <div key={j}>
        <div
          className="p-shadow-5"
          style={{ width: "80%", marginLeft: "9em" }}
        >
          <h1 className="p-p-2">Section{j + 1}</h1>
          <br />
          <div className="p-field p-grid">
            <label
              htmlFor="Height"
              className="p-col-fixed"
              style={{ width: "100px", marginLeft: "2em" }}
            >
              <b>Link:</b>
            </label>
            <div className="p-col-12 p-md-6 p-lg-3">
              
              <InputText
                id="link"
                name="link"
                type="text"
                placeholder="Link"
                value={els.link}
                style={{ marginLeft: "2em" }}
                className={this.state.errors[i] ? this.state.errors[i].subSections[j].link:""}
                onChange={this.handleSubChange.bind(this, i, j)}
              />
              
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="Header"
              className="p-col-fixed"
              style={{ width: "100px", marginLeft: "2em" }}
            >
              <b>Header:</b>
            </label>
            <div className="p-pl-2">
              
              <InputText
                className="p-mr-2 p-d-inline"
                placeholder="Header Text"
                id="header"
                name="text"
                type="text"
                value={els.header.text}
                style={{ marginLeft: "2em" }}
                onChange={this.handleSubChangeHeader.bind(this, i, j)}
                className={this.state.errors[i] ? this.state.errors[i].subSections[j].header.text:""}
              />
              
              <InputText
                className="p-mr-2 p-d-inline"
                placeholder="Header Link"
                id="link"
                name="link"
                type="text"
                value={els.header.link}
                style={{ marginLeft: "2em" }}
                onChange={this.handleSubChangeHeader.bind(this, i, j)}
                className={this.state.errors[i] ? this.state.errors[i].subSections[j].header.link:""}
              />
              
              
              <Dropdown
                value={els.header.align}
                onChange={this.handleSubChangeHeader.bind(this, i, j)}
                options={this.data}
                placeholder="Select"
                name="align"
                id="align"
                scrollHeight="100px"
                style={{width:"150px",marginLeft:"5px"}}
                className={this.state.errors[i] ? this.state.errors[i].subSections[j].header.align:""}
              />
              
            </div>
          </div>

          <div className="p-field p-grid p-pb-3">
            <label
              htmlFor="Footer"
              className="p-col-fixed"
              style={{ width: "100px", marginLeft: "2em" }}
            >
              <b>Footer:</b>
            </label>
            <div className="p-pl-2">
              
              <InputText
                className="p-mr-2 p-d-inline"
                placeholder="Footer Text"
                id="footer"
                name="text"
                type="text"
                value={els.footer.text}
                style={{ marginLeft: "2em" }}
                onChange={this.handleSubChangeFooter.bind(this, i, j)}
                className={this.state.errors[i] ? this.state.errors[i].subSections[j].footer.text:""}
              />
              
              
              <InputText
                className="p-mr-2 p-d-inline"
                placeholder="Footer Link"
                id="link"
                name="link"
                type="text"
                value={els.footer.link}
                style={{ marginLeft: "2em" }}
                onChange={this.handleSubChangeFooter.bind(this, i, j)}
                className={this.state.errors[i] ? this.state.errors[i].subSections[j].footer.link:""}
              />
              
              
              <Dropdown
                value={els.footeralign}
                onChange={this.handleSubChangeFooter.bind(this, i, j)}
                options={this.data}
                placeholder="Select"
                name="align"
                id="align"
                value={els.footer.align}
                className={this.state.errors[i] ? this.state.errors[i].subSections[j].footer.align:""}
                scrollHeight="100px"
                style={{width:"150px",marginLeft:"5px"}}
              />
              
            </div>
          </div>

          <div>{this.image(els.images, i, j)}</div>

          <div className="p-field p-grid">
          <Button className="p-m-3" onClick={this.removeSection.bind(this,i,j)}>
                 Remove Section
          </Button>
          <div className="p-p-1" style={{ marginLeft: "29em" }}>
            <Button
              className="p-m-2"
              onClick={this.addImageClick.bind(this, i, j)}
            >
              Add Image
           </Button> 
          </div>
          </div>
        </div>
      </div>
    ));
  }

  handleSubChange(i, j, event) {
    const { name, value } = event.target;
    let list = [...this.state.palettes];
    list[i].subSections[j][name] = value;
    this.setState({ list }); 
    this.state.errors[i].subSections[j][name]=value.length === 0 ? "p-invalid" : "";   
  }

  handleSubChangeHeader(i, j, event) {
    const { name, value } = event.target;
    let list = [...this.state.palettes];
    list[i].subSections[j].header[name]= value;
    this.setState({ list });
    if(name=="align"){this.state.errors[i].subSections[j].header[name]=value.length === 0 ? "p-invalid" : "";}
    else{this.state.errors[i].subSections[j].header[name]=value.length === 0 ? "p-invalid" : "";}   
  }

  handleSubChangeFooter(i, j, event) {
    const { name, value } = event.target;
    let list = [...this.state.palettes];
    list[i].subSections[j].footer[name]= value;
    this.setState({ list });
    if(name=="align"){this.state.errors[i].subSections[j].footer[name]=value.length === 0 ? "p-invalid" : "";}
    else{this.state.errors[i].subSections[j].footer[name]=value.length === 0 ? "p-invalid" : "";}   
  }

  removeSection(i,j){
    if(this.state.palettes[i].subSections.length>1)
    {
   this.state.palettes[i].subSections.splice(j,1)
   this.state.errors[i].subSections.splice(j,1)
   this.setState(this.state)
    }
  }
  addSubClick(i){
    let x = this.state.palettes[i].subSections;
    x.push({
        link:"",
        header:{
          text: "",
          link: "",
          align: "",
        },
        footer:{
          text: "",
          link: "",
          align: "",
        },
        images: [
          {
            url:"",
            link:"",
            width: "",
            height: "",
            header:{
              text: "",
              link: "",
              align: "",
            },
            footer:{
              text: "",
              link: "",
              align: "",
            },
          },
        ],
    })
    this.setState(this.state.palettes[i].subSections);
    this.state.errors[i].subSections.push(
      {
        link:"",
        header:{
          text: "",
          link: "",
          align: "",
        },
        footer:{
          text: "",
          link: "",
          align: "",
        },
        images: [
          {
            url:"",
            link:"",
            width: "",
            height: "",
            header:{
              text: "",
              link: "",
              align: "",
            },
            footer:{
              text: "",
              link: "",
              align: "",
            },
          },
        ],
      }
    )
  }

  image(vals, i, j) {
    return vals.map((elss, k) => (
      <div key={k} className="p-shadow-5" >
        <h1 className="p-p-2">
          Image{k + 1}
        </h1>
        <div className="p-field p-grid">
          <label
            htmlFor="imageUrl"
            className="p-col-fixed"
            style={{ width: "140px", marginLeft: "2em" }}
          >
            <b>Image URL:</b>
          </label>
          <div>
            
            <InputText
              id="url"
              name="url"
              type="text"
              placeholder="Image URL"
              value={elss.url}
              onChange={this.handleImage.bind(this, i, j, k)}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].url:""}
            />
            
          </div>
        </div>


        <div className="p-field p-grid">
          <label
            htmlFor="hyperLink"
            className="p-col-fixed"
            style={{ width: "140px", marginLeft: "2em" }}
          >
            <b>Hyper Link:</b>
          </label>
          <div>
            
            <InputText
              id="link"
              name="link"
              type="text"
              placeholder="Hyper Link"
              value={elss.link}
              onChange={this.handleImage.bind(this, i, j, k)}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].link:""}
            />
            
          </div>
        </div>
        <div className="p-field p-grid">
          <label
            htmlFor="Width"
            className="p-col-fixed"
            style={{ width: "100px", marginLeft: "2em" }}
          >
            <b>Width:</b>
          </label>
          <div className="p-col-12 p-md-6 p-lg-3">
            
            <InputText
              id="Width"
              name="width"
              type="text"
              placeholder="Width"
              value={elss.width}
              style={{ marginLeft: "2em" }}
              onChange={this.handleImage.bind(this, i, j, k)}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].width:""}
            />
            
          </div>
        </div>

        <div className="p-field p-grid">
          <label
            htmlFor="Height"
            className="p-col-fixed"
            style={{ width: "100px", marginLeft: "2em" }}
          >
            <b>Height:</b>
          </label>
          <div className="p-col-12 p-md-6 p-lg-3">
            
            <InputText
              id="height"
              name="height"
              type="text"
              placeholder="Height"
              value={elss.height}
              style={{ marginLeft: "2em" }}
              onChange={this.handleImage.bind(this, i, j, k)}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].height:""}
            />
            
          </div>
        </div>

        <div className="p-field p-grid">
          <label
            htmlFor="Header"
            className="p-col-fixed"
            style={{ width: "100px", marginLeft: "2em" }}
          >
            <b>Header:</b>
          </label>
          <div className="p-pl-2">
            
            <InputText
              className="p-mr-2 p-d-inline"
              placeholder="Header Text"
              id="header"
              name="text"
              type="text"
              value={elss.header.text}
              style={{ marginLeft: "2em" }}
              onChange={this.handleImageHeader.bind(this, i, j, k)}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].header.text:""}
            />
            
            
            <InputText
              className="p-mr-2 p-d-inline"
              placeholder="Header Link"
              id="headerLink"
              name="link"
              type="text"
              value={elss.header.link}
              style={{ marginLeft: "2em" }}
              onChange={this.handleImageHeader.bind(this, i, j, k)}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].header.link:""}
            />
            
            
            <Dropdown
              value={elss.header.align}
              onChange={this.handleImageHeader.bind(this, i, j, k)}
              options={this.data}
              placeholder="Select"
              name="align"
              id="headerAlign"
              scrollHeight="100px"
              style={{width:"150px",marginLeft:"5px"}}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].header.align:""}
            />
            
          </div>
        </div>

        <div className="p-field p-grid">
          <label
            htmlFor="Footer"
            className="p-col-fixed"
            style={{ width: "90px", marginLeft: "2em" }}
          >
            <b>Footer:</b>
          </label>
          <div className="p-pl-2">
            
            <InputText
              className="p-mr-2 p-d-inline"
              placeholder="Footer Text"
              id="footer"
              name="text"
              type="text"
              value={elss.footer.text}
              style={{ marginLeft: "2.5em" }}
              onChange={this.handleImageFooter.bind(this, i, j, k)}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].footer.text:""}
            />
            
            
            <InputText
              className="p-mr-2 p-d-inline"
              placeholder="Footer Link"
              id="footerLink"
              name="link"
              type="text"
              value={elss.footer.link}
              style={{ marginLeft: "2em" }}
              onChange={this.handleImageFooter.bind(this, i, j, k)}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].footer.link:""}
            />
            
            
            <Dropdown
              value={elss.footer.align}
              onChange={this.handleImageFooter.bind(this, i, j, k)}
              options={this.data}
              placeholder="Select"
              name="align"
              id="align"
              scrollHeight="100px"
              style={{width:"150px",marginLeft:"5px"}}
              className={this.state.errors[i] ? this.state.errors[i].subSections[j].images[k].footer.align:""}
            />
          </div>
          <div className="p-field p-grid p-m-3" >
                <Button onClick={this.removeImage.bind(this,i,j,k)}>
                      Remove Image
                </Button>
              </div>
        </div>
      </div>
    ));
  }

  handleImage(i, j, k, event) {
    const { name, value } = event.target;
    let list = [...this.state.palettes];
    list[i].subSections[j].images[k][name] = value;
    this.setState({ list });
    this.state.errors[i].subSections[j].images[k][name]=value.length === 0 ? "p-invalid" : "";
  }

  handleImageHeader(i, j, k, event) {
    const { name, value } = event.target;
    let list = [...this.state.palettes];
    list[i].subSections[j].images[k].header[name] = value;
    this.setState({ list });
    if(name=="align"){this.state.errors[i].subSections[j].images[k].header[name]=value.length === 0 ? "p-invalid" : "";}
    else{this.state.errors[i].subSections[j].images[k].header[name]=value.length === 0 ? "p-invalid" : "";}
  }

  handleImageFooter(i, j, k, event) {
    const { name, value } = event.target;
    let list = [...this.state.palettes];
    list[i].subSections[j].images[k].footer[name] = value;
    this.setState({ list });
    if(name=="align"){this.state.errors[i].subSections[j].images[k].footer[name]=value.length === 0 ? "p-invalid" : "";}
    else{this.state.errors[i].subSections[j].images[k].footer[name]=value.length === 0 ? "p-invalid" : "";}
  }
  addImageClick(i,j,k){
    let x = this.state.palettes[i].subSections[j].images;
    if(x.length<4){
      if(x.length==2)
      {
        x.push({
          url:"",
          link:"",
          width: "",
          height: "",
          header:{
            text: "",
            link: "",
            align: "",
          },
          footer:{
            text: "",
            link: "",
            align: "",
          },
 },
 {
  url:"",
  link:"",
  width: "",
  height: "",
  header:{
    text: "",
    link: "",
    align: "",
  },
  footer:{
    text: "",
    link: "",
    align: "",
  },
}
 )


 this.setState(this.state.palettes[i].subSections[j].images);
 this.state.errors[i].subSections[j].images.push(
   {
    url:"",
    link:"",
    width: "",
    height: "",
    header:{
      text: "",
      link: "",
      align: "",
    },
    footer:{
      text: "",
      link: "",
      align: "",
    }
   },{
    url:"",
    link:"",
    width: "",
    height: "",
    header:{
      text: "",
      link: "",
      align: "",
    },
    footer:{
      text: "",
      link: "",
      align: "",
    }
   }
 )  
      }    
      else{
        x.push({
          url:"",
          link:"",
          width: "",
          height: "",
          header:{
            text: "",
            link: "",
            align: "",
          },
          footer:{
            text: "",
            link: "",
            align: "",
          },
 })
 this.setState(this.state.palettes[i].subSections[j].images);
 this.state.errors[i].subSections[j].images.push(
   {
    url:"",
    link:"",
    width: "",
    height: "",
    header:{
      text: "",
      link: "",
      align: "",
    },
    footer:{
      text: "",
      link: "",
      align: "",
    }
   }
 )
          }
    }
    
  }

  removeImage(i,j,k){
    this.state.palettes[i].subSections[j].images.splice(k,1)
    this.state.errors[i].subSections[j].images.splice(k,1)
    this.setState(this.state)
  }

  handleSubmit(event) {
    let isFormValid = true;
    let list = [...this.state.errors]
    this.state.palettes.map((top,i)=>{
      if(top.type.length === 0 || top.header.text.length === 0 || top.header.link.length === 0|| top.header.align.length === 0 || top.footer.text.length === 0 || top.footer.link.length === 0|| top.footer.align.length === 0 )
      {isFormValid=false
      if(top.type.length === 0){list[i].type="p-invalid" 
                                this.setState({})
      }
      if(top.header.text.length === 0){list[i].header.text="p-invalid" 
                                      this.setState({})
      }
      if(top.header.link.length === 0){
                                      list[i].header.link="p-invalid" 
                                      this.setState({})
      }
      if(top.header.align.length === 0){
                                      list[i].header.align="p-invalid" 
                                      this.setState({})
      }
      if(top.footer.text.length === 0){
                                      list[i].footer.text="p-invalid" 
                                      this.setState({})
      }
      if(top.footer.link.length === 0){list[i].footer.link="p-invalid" 
                                      this.setState({})
      }
      if(top.footer.align.length === 0){list[i].footer.align="p-invalid" 
                                      this.setState({})
      }
    }else if(top.subSections.length>0){
      top.subSections.map((sub,j)=>{
        if(sub.link.length === 0 || sub.header.text.length === 0 || sub.header.link.length === 0|| sub.header.align.length === 0 || sub.footer.text.length === 0 || sub.footer.link.length === 0|| sub.footer.align.length === 0 )  
      {isFormValid=false
      if(sub.link.length === 0){list[i].subSections[j].link="p-invalid"
                                this.setState({})
      }
      if(sub.header.text.length === 0){list[i].subSections[j].header.text="p-invalid" 
                                      this.setState({})
      }
      if(sub.header.link.length === 0){
                                      list[i].subSections[j].header.link="p-invalid" 
                                      this.setState({})
      }
      if(sub.header.align.length === 0){
                                      list[i].subSections[j].header.align="p-invalid" 
                                      this.setState({})
      }
      if(sub.footer.text.length === 0){
                                      list[i].subSections[j].footer.text="p-invalid" 
                                      this.setState({})
      }
      if(sub.footer.link.length === 0){list[i].subSections[j].footer.link="p-invalid" 
                                      this.setState({})
      }
      if(sub.footer.align.length === 0){list[i].subSections[j].footer.align="p-invalid" 
                                      this.setState({})
      }
        }
        else if(sub.images.length>0){
          sub.images.map((image,k)=>{
            if(image.url.length === 0 || image.link.length === 0 || image.width.length === 0 || image.height.length === 0 || image.header.text.length === 0 || image.header.link.length === 0|| image.header.align.length === 0 || image.footer.text.length === 0 || image.footer.link.length === 0|| image.footer.align.length === 0 )  
            {isFormValid=false
              if(image.url.length ===0){
                list[i].subSections[j].images[k].url="p-invalid"
                                this.setState({})
              }
              if(image.link.length ===0){
                list[i].subSections[j].images[k].link="p-invalid"
                                this.setState({})
              }
              if(image.width.length ===0){
                list[i].subSections[j].images[k].width="p-invalid"
                                this.setState({})
              }
              if(image.height.length ===0){
                list[i].subSections[j].images[k].height="p-invalid"
                                this.setState({})
              }

              if(image.header.text.length ===0){
                list[i].subSections[j].images[k].header.text="p-invalid"
                                this.setState({})
              }
              if(image.header.link.length ===0){
                list[i].subSections[j].images[k].header.link="p-invalid"
                                this.setState({})
              }
              if(image.header.align.length ===0){
                list[i].subSections[j].images[k].header.align="p-invalid"
                                this.setState({})
              }

              if(image.footer.text.length ===0){
                list[i].subSections[j].images[k].footer.text="p-invalid"
                                this.setState({})
              }
              if(image.footer.link.length ===0){
                list[i].subSections[j].images[k].footer.link="p-invalid"
                                this.setState({})
              }
              if(image.footer.align.length ===0){
                list[i].subSections[j].images[k].footer.align="p-invalid"
                                this.setState({})
              }
            }            
          })
        }
      }
      )
    }
    })

    if(isFormValid){
      let finalJson={
        createdBy: "Bhanu",
        createdDt:"20-12-2020 02:02 AM",
        modifiedBy:"Bhanu",
        modifiedDt:"21-12-2020 02:02 AM",
        configName:"1",
        eventName:"Event",
        id:"",
        palettes:this.state.palettes
  
      }
      this.HomePageConfigService.UpdateHomePageConfig(this.state.id,finalJson);
      axios
        .put("http://localhost:8000/app/update/"+this.state.id,finalJson)
        .then((response) => {
          console.log(response);
          this.toast.show({
            severity: "success",
            summary: "Success",
            detail: "successfully inserted the palettes",
            life: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify(error) + "Error");
        });
        
      }
    else{
      alert("Please Enter all Values")
    }
  }
  
  render() {
    return (
      <div>
        <Toast ref={(el) => (this.toast = el)} />
        <div className="p-mb-6" style={{ color: "red", textAlign: "center" }}>
          <h1>Welcome to HomePage Configuration</h1>
        </div>

        {this.createUI()}
        <div className="p-p-1" style={{ marginLeft: "55em" }}>
          <Button
            className="p-m-2"
            type="button"
            onClick={this.addClick.bind(this)}
          >
            Add Row
          </Button>
        </div>
        <br></br>
        <div className="p-p-1" style={{ marginLeft: "57em" }}>
     <Button type="submit" label="Submit" onClick={this.handleSubmit.bind(this)} /> 
        </div>

      </div>
    );
  }
}

export default UpdateHomePageConfig;




