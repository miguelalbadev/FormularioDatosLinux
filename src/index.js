import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: {Id:'', Nombre:'',Apellidos:'',Edad:''}};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeApellidos = this.handleChangeApellidos.bind(this);
    this.handleChangeEdad = this.handleChangeEdad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  carga(data) {
    debugger;
      if (data != null) {
        
        this.setState({value:{Nombre:data.Nombre,Apellidos:data.Apellidos,Edad:data.Edad}});
        
      }
    }

  componentDidMount(){

    $.ajax({

      url:"http://10.60.23.21:64509/api/Personas/2",
        type : 'GET',
 
        // el tipo de información que se espera de respuesta
        dataType : 'json',
     
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : (datos) => this.carga(datos),
     
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
   });
  }



  validaNombre(valor){
    if(valor.length<=20){
        return true;
    }
    else{
      return false;
    }
  }

  validaEdad(edad){
    let str = edad;
    let patt = new RegExp("^([0-9]{1,3})$");
    let res = patt.test(str);
      if(res){
      
        return true;
      }
      else{
        return false;
      }

  }
  handleChangeNombre(event) {
    let nombre = event.target.value;
    if(this.validaNombre(nombre)){
      this.setState({value:{Nombre:event.target.value,Apellidos:this.state.value["Apellidos"],Edad:this.state.value["Edad"]}});
    }
    else{
      alert('El nombre introducido no es válido');
    }

    
  }

  handleChangeApellidos(event) {
    let apellidos = event.target.value;
    if(this.validaNombre(apellidos)){
      this.setState({value:{Nombre:this.state.value["Nombre"],Apellidos:event.target.value,Edad:this.state.value["Edad"]}});
    }
    else{
      alert('Los apellidos introducidos no son válidos');
    }
    
  }

  handleChangeEdad(event) {
    try{
      let edad = event.target.value;
      if(this.validaEdad(edad)){
        this.setState({value:{Nombre:this.state.value["Nombre"],Apellidos:this.state.value["Apellidos"],Edad:event.target.value}});
      }
      else{
        alert('El formato de edad no es correcto');
      }
    }
    catch(Exception){
      alert('El formato de la edad no es correcto');

    }
    
    
    
  }

  handleChange(event) {
    //this.setState({value:{Nombre:event.target.value,Apellidos:'Sanchez Pérez',Edad:'46'}});
  }

  handleSubmit(event) {
    //alert('Hola don: ' + this.state.value["Nombre"]+' '+this.state.value["Apellidos"]+' '+this.state.value["Edad"]);
    let nombre = document.getElementById('textNombre').value;
    let apellidos = document.getElementById('textApellidos').value;
    let edad = document.getElementById('textEdad').value;

    $.ajax({

      url:"http://10.60.23.21:64509/api/Personas",
        type : 'POST',
 
        // el tipo de información que se espera de respuesta
        dataType : 'json',

        data : { Nombre: nombre, Apellidos: apellidos, Edad:edad} ,
     
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(data) {
          debugger;
          alert('La función POST funcionó correctamente');
            
        },
     
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error : function(xhr, status) {
          debugger;
            alert('Disculpe, existió un problema con la función POST');
        },
     
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
    });
    event.preventDefault();
  }

  handleDelete(event){
    alert('Has seleccionado borrar la persona');
  }

  handleUpdate(event){
    alert('Has seleccionado modificar la persona');
  }

  render() {
    return (
    <fieldset>
      <legend>Datos personales</legend>
     	<form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input id="textNombre" type="text" value={this.state.value["Nombre"]} onChange={this.handleChangeNombre} />
          </label>
          <br/><br/>
          <label>
            Apellidos:
            <input id="textApellidos" type="text" value={this.state.value["Apellidos"]} onChange={this.handleChangeApellidos} />
          </label>
          <br/><br/>
          <label>
            Edad:
            <input id="textEdad" type="text" value={this.state.value["Edad"]} onChange={this.handleChangeEdad} />
          </label>
          <br/><br/>
          <input id="buttonCrear" type="submit" value="Guardar" />
          <button type="reset" id="buttonNuevo">Nuevo</button>
          <button onClick={this.handleDelete} type="button" id="buttonEliminar">Eliminar</button>
          
        </form>
      </fieldset>
    );
  }
}



ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
