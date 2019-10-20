import { Injectable } from '@angular/core';
import { Platform, NavController } from '@ionic/angular'
//import { Network }      from '@ionic-native/network';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from './env.service';
//import { tap }          from 'rxjs/operators';
//import { User }         from '../models/user';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
//import { Base64 } from '@ionic-native/base64/ngx';
//import { Observable, throwError } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private headers = new Headers();
  isLoggedIn = false;
  coletionsData: any;
  constructor(
    private http: HttpClient,
    private platform: Platform,
    //private network: Network,      
    private env: EnvService,
    private alertService: AlertService,
    //private base64: Base64   
    private db : Storage      
  ) {
    this.headers.append('Content-Type', 'application/json');
  }

  /*
  CheckConnectivity() {
    this.platform.ready().then(() => {
      // if no internet, notice is a string
      if (this.network.type == 'none' ) {         
        this.alertService.presentAlert({
          pTitle:'ATENÇÃO',
          pSubtitle:'Autendicação no Sistema',
          pMessage:'Não existe conexão de dados no momento. Tente novamente'
        });
      } else {
          return false;
      }
    })
  }
  */
  // função para verificar conexão de Host Engine API
  EngineStatusConection = function (host: string) {
    var started = new Date().getTime();
    var url = host
    fetch(url).then(response => {
      if (response.status === 200) {
        return response.statusText;
      } else {
        throw new Error('Algo deu errado no servidor da EngineAPI!');
      }
    }
    ).then(response => {
      console.debug(response);
      sessionStorage.setItem('EngineStatusConection', "ON");
      return true;
    }
    ).catch(error => {
      //console.error(error);
      sessionStorage.setItem('EngineStatusConection', 'OFF');
      return false;
    }
    );
  }

  Login = async function (form: NgForm) {
    //--------------------------------------------------------------------------------------------    
    // Função Login 
    // Criação / Atualização: 24/07/2019 as 15:35          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");    

    let ParamDataJson = btoa(JSON.stringify(form.value)); // encode string  
    let strDataJson = atob(ParamDataJson);                // decode string
   
    //console.log(strDataJson); 
    let ParamHashkey = sessionStorage.SessionHashkey;

    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/authentication?';
    const paramsAPI = "DataJson=" + ParamDataJson; //+ "&Hashkey="+ParamHashkey;

    const EngineAPI = paramUrlAPI + paramsAPI
    console.log(EngineAPI);
    return new Promise((resolve, reject) => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(
        data => {
          if (data[0].success) {            
            //sessionStorage.setItem('SessionUser', JSON.stringify(data[0].results));
            this.db.set('LSU',  data[0].results );
            sessionStorage.setItem('SessionUser', atob(data[0].results));
            sessionStorage.setItem("SessionHashkey", data[0].hashkey);
            sessionStorage.setItem("SessionConection", "1");
          }
          else {
            sessionStorage.setItem("SessionConection", "0");
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Autenticação no Sistema', pMessage: "Senha ou usuário inválido"});
          }
          resolve(data);
        },
        (error: any) => {
          this.alertService.presentAlert({ pTitle: "Atenção", pSubtitle: "Servidor Indisponível. Tente mais tarde!!!", pMessage: "Status Error:" + error.status + " | " + error.statusText });
          console.log("Error: ", error);
        }
      );
    });
  }
  
  Register = async function (form: NgForm) {
    //--------------------------------------------------------------------------------------------    
    // Função Login 
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");        
    let StoreProcName = "spRegister";        
    let ParamDataJson = btoa(JSON.stringify(form.value)); // encode string  
    let strDataJson = atob(ParamDataJson);                // decode string
    //console.log(strDataJson);              

    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/register?';
    const paramsAPI = "StoreProcName="+StoreProcName+"&DataJson=" + ParamDataJson;

    const EngineAPI = paramUrlAPI + paramsAPI
    return new Promise(resolve => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(data => {
        resolve(data);
        //console.log(data);                              
      },
        (error: any) => {
          this.alertService.presentAlert({ pTitle: "Atenção", pSubtitle: "Servidor Indisponível. Tente mais tarde!!!", pMessage: "Status Error:" + error.status + " | " + error.statusText });
          console.log("Error: ", error);
        }
      );
    })

  }


  QueryStoreProc = async function (MetodoNameAPI: String, StoreProcName: String , ParamsJson: any) {
    //--------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API  
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");       
    let ParamDataJson = btoa(JSON.stringify(ParamsJson)); // encode string  
    //let strDataJson = atob(ParamDataJson);                // decode string
    //console.log(strDataJson);              
    //ConsultaMenu
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + MetodoNameAPI + '?';
    const paramsAPI = "StoreProcName="+StoreProcName+"&DataJson=" + ParamDataJson;

    const EngineAPI = paramUrlAPI + paramsAPI;
    //console.log(EngineAPI);
    return new Promise(resolve => {
      this.coletionsData = this.http.get(EngineAPI);

      this.coletionsData.subscribe(
        data => {          
          resolve(data);
        },
        (error: any) => {
          this.alertService.presentAlert({ pTitle: "Atenção", pSubtitle: "Servidor ou Método Indisponível. Tente mais tarde!!!", pMessage: "Status Error:" + error.status + " | " + error.statusText });
          console.log("Error: ", error);
        }
      );
    });
  } 


  QueryStoreProcNgForm =function (opcao: String,variable: string,consultaJson : NgForm ) {    
    //--------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API  
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");        
    let ParamDataJson = btoa(JSON.stringify(consultaJson)); // encode string  
    let strDataJson = atob(ParamDataJson);                // decode string
    console.log(strDataJson); 
    
  var a=  strDataJson.substring(strDataJson.indexOf(':')+2, strDataJson.indexOf('}')-1)
  console.log(a)
    //ConsultaMenu
    console.log(ParamDataJson)
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + opcao + '?';
    let go =consultaJson;
    console.log("consultaJson",consultaJson)
    const paramsAPI = ParamDataJson;
    console.log(paramsAPI);
    
    const EngineAPI = paramUrlAPI +variable+"="+ paramsAPI
    console.log(EngineAPI)
    return new Promise(resolve => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(data => {                                    
        resolve(data);      
        console.log(data);                              
      },
      (error: any) => 
          { 
            this.alertService.presentAlert({pTitle:"Atenção",pSubtitle:"Servidor Indisponível. Tente mais tarde!!!",pMessage:"Status Error:"+error.status +" | "+error.statusText} );
            //console.log("Error: ", error);
          }
      );   
    })  
  }

  QueryStoreProcDelete1 =function (opcao: String,procedure: String,variable: string,consultaJson : string ) {    
    //--------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API  
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");        
    let ParamDataJson = btoa(JSON.stringify(consultaJson)); // encode string  
    let strDataJson = atob(ParamDataJson);                // decode string
    console.log(strDataJson); 
    
  var a=  strDataJson.substring(strDataJson.indexOf(':')+2, strDataJson.indexOf('}')-1)
  console.log(a)
    //ConsultaMenu
    console.log(ParamDataJson)
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + opcao + '?';
    let go =consultaJson;
    console.log("consultaJson",consultaJson)
    const paramsAPI = go;
    console.log(paramsAPI);
    
    const EngineAPI = paramUrlAPI +variable+"="+ paramsAPI+"&spProcedure="+procedure
    console.log(EngineAPI)
    return new Promise(resolve => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(data => {                                    
        resolve(data);      
        console.log(data);                              
      },
      this.alertService.presentAlert({pTitle:"Success",pSubtitle:"Success!!!"} )
           
      );   
    })  
  }

  
  QueryStoreProcNgFormExec =function (opcao: String,procedure: String,variable: string,consultaJson : any ) {    
    //--------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API  
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");        
    let ParamDataJson = btoa(JSON.stringify(consultaJson)); // encode string  
    let strDataJson = atob(ParamDataJson);                // decode string
    console.log(strDataJson); 
    
  var a=  strDataJson.substring(strDataJson.indexOf(':')+2, strDataJson.indexOf('}')-1)
  console.log(a)
    //ConsultaMenu
    console.log(ParamDataJson)
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + opcao + '?';
    let go =consultaJson;
    console.log("consultaJson",consultaJson)
    const paramsAPI = ParamDataJson;
    console.log(paramsAPI);
    
    const EngineAPI = paramUrlAPI +variable+"="+ paramsAPI+"&spProcedure="+procedure
    console.log(EngineAPI)
    return new Promise(resolve => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(data => {                                    
        resolve(data);      
        console.log(data);                              
      },
      (error: any) => 
          { 
            this.alertService.presentAlert({pTitle:"Atenção",pSubtitle:"Servidor Indisponível. Tente mais tarde!!!",pMessage:"Status Error:"+error.status +" | "+error.statusText} );
            //console.log("Error: ", error);
          }
      );   
    })  
  }




 

  QueryStoreProc1 = async function (opcao: String,variable: string,consultaJson : string ) {    
    //--------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API  
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");        
    let ParamDataJson = btoa(JSON.stringify(consultaJson)); // encode string  
    let strDataJson = atob(ParamDataJson);                // decode string
    console.log(strDataJson); 
    
  var a=  strDataJson.substring(strDataJson.indexOf(':')+2, strDataJson.indexOf('}')-1)
  console.log(a)
    //ConsultaMenu
    console.log(ParamDataJson)
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + opcao + '?';
    let go =consultaJson;
    console.log("consultaJson",consultaJson)
    const paramsAPI = go;
    console.log(paramsAPI);
    
    const EngineAPI = paramUrlAPI +variable+"="+ paramsAPI
    console.log(EngineAPI)
    return new Promise(resolve => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(data => {                                    
        resolve(data);      
        console.log(data);                              
      },
      (error: any) => 
          { 
            this.alertService.presentAlert({pTitle:"Atenção",pSubtitle:"Servidor Indisponível. Tente mais tarde!!!",pMessage:"Status Error:"+error.status +" | "+error.statusText} );
            //console.log("Error: ", error);
          }
      );   
    })  
  }


  QueryStoreProcNoParams = async function (opcao: String,consultaJson : string ) {    
    //--------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API  
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");        
    let ParamDataJson = btoa(JSON.stringify(consultaJson)); // encode string  
    let strDataJson = atob(ParamDataJson);                // decode string
    console.log(strDataJson); 
    
  var a=  strDataJson.substring(strDataJson.indexOf(':')+2, strDataJson.indexOf('}')-1)
  console.log(a)
    //ConsultaMenu
    console.log(ParamDataJson)
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + opcao + '?';
    let go =consultaJson;
    console.log("consultaJson",consultaJson)
    const paramsAPI = go;
    console.log(paramsAPI);
    
    const EngineAPI = paramUrlAPI +"spProc"+"="+ paramsAPI
    console.log(EngineAPI)
    return new Promise(resolve => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(data => {                                    
        resolve(data);      
        console.log(data);                              
      },
      (error: any) => 
          { 
            this.alertService.presentAlert({pTitle:"Atenção",pSubtitle:"Servidor Indisponível. Tente mais tarde!!!",pMessage:"Status Error:"+error.status +" | "+error.statusText} );
            //console.log("Error: ", error);
          }
      );   
    })  
  }


  QueryStoreProcDelete = async function (opcao: String,variable: string,consultaJson : string ) {    
    //--------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API  
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");        
    let ParamDataJson = btoa(JSON.stringify(consultaJson)); // encode string  
    let strDataJson = atob(ParamDataJson);                // decode string
    console.log(strDataJson); 
    
  var a=  strDataJson.substring(strDataJson.indexOf(':')+2, strDataJson.indexOf('}')-1)
  console.log(a)
    //ConsultaMenu
    console.log(ParamDataJson)
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + opcao + '?';
    let go =consultaJson;
    console.log("consultaJson",consultaJson)
    const paramsAPI = go;
    console.log(paramsAPI);
    
    const EngineAPI = paramUrlAPI +variable+"="+ paramsAPI
    console.log(EngineAPI)
    return new Promise(resolve => {
  
            this.alertService.presentAlert({pTitle:"Success",pSubtitle:"usuário excluído com sucesso!"} );
            //console.log("Error: ", error);
          
  
    })  
  }
























  QueryStoreProcString = async function (opcao: String, consultaJson : string ) {    
    //--------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API  
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");        
    let ParamDataJson = btoa(JSON.stringify(consultaJson)); // encode string  
    let strDataJson = atob(ParamDataJson);                // decode string
    console.log(strDataJson);              
    //ConsultaMenu
    console.log(ParamDataJson)
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + opcao + '?';
    let go =consultaJson;
    console.log("consultaJson",consultaJson)
    const paramsAPI = go;
    console.log(paramsAPI);
    
    const EngineAPI = paramUrlAPI + paramsAPI
    console.log(EngineAPI)
    return new Promise(resolve => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(data => {                                    
        resolve(data);      
        console.log(data);                              
      },
      (error: any) => 
          { 
            this.alertService.presentAlert({pTitle:"Atenção",pSubtitle:"Servidor Indisponível. Tente mais tarde!!!",pMessage:"Status Error:"+error.status +" | "+error.statusText} );
            //console.log("Error: ", error);
          }
      );   
    })  
  }







  QueryStoreProc2 = async function (opcao: String, consultaJson : string ) {    
    //--------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API  
    // Criação / Atualização: 29/07/2019 as 10:42          
    // Por Gilson DeLima    
    //--------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    //--------------------------------------------------------------------------------------------
    //this.alertService.showLoader("Processando... Aguarde por favor!!!");        
    let ParamDataJson = btoa(JSON.stringify(consultaJson)); // encode string  
    //let strDataJson = atob(ParamDataJson);                // decode string
    //console.log(strDataJson);              
    //ConsultaMenu
    console.log(ParamDataJson)
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + opcao + '?';
    let go =consultaJson;
    const paramsAPI = "uf=" + go;
    
    const EngineAPI = paramUrlAPI + paramsAPI
    return new Promise(resolve => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(data => {                                    
        resolve(data);      
        console.log(data);                              
      },
      (error: any) => 
          { 
            this.alertService.presentAlert({pTitle:"Atenção",pSubtitle:"Servidor Indisponível. Tente mais tarde!!!",pMessage:"Status Error:"+error.status +" | "+error.statusText} );
            //console.log("Error: ", error);
          }
      );   
    })  
  }


}