import React from 'react';
import {Button, Icon, Input} from "semantic-ui-react";


export default class SearchField extends React.Component{

    constructor(props){
        super(props);
    }


    componentDidMount(){

    }

    render(){
        return(
            <Input fluid
                   autoFocus
                   placeholder={"Enter the video videoKey"}
                   action={ () => {
                    //    return (
                    //        <Button color={this.props.color}
                    //                disabled={ this.props.disabled }
                    //                loading={ this.props.loading }>
                    //            <Icon name={"download"} />
                    //        </Button>
                    //    );
                   } }
                   size={"large"}
                   style={{
                       marginTop : '10vh',
                       boxShadow : '2px 2px 5px #ccc',
                       marginBottom : '14px'
                   }}
                   onChange={ (event, data) => {
                       let validation = this.validateURL(data.value);
                       if(data.value === ''){
                           this.props.onChange({
                               error : false,
                               message : '',
                               videoKey : '',
                               embeddable : false,
                               videoDetails: {},
                               loading : false
                           });
                           return;
                       }
                       if(!validation){

                           this.props.onChange({
                               error : true,
                               message : 'The link is not a valid youtube link!',
                               videoKey : '',
                               videoDetails: {},
                               loading : false
                           });
                           return;
                       }
                       this.props.onChange({
                           videoKey : this.getVideoKey(data.value),
                           error : false,
                           videoDetails: {},
                           loading : true
                       });
                   }}
            />
        );
    }

    validateURL(url) {
        if(!url){
            return false;
        }
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11);
    };

    getVideoKey(url){
        url =  url.split('v=')[1];
        let ampersandPOs = url.indexOf('&');
        if(ampersandPOs != -1){
            url = url.substring(0, ampersandPOs);
        }
        return url;
    }

}