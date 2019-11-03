import React from 'react';
import { Button, ButtonGroup, Icon } from 'semantic-ui-react';


export default class DownloadButtons extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            videoKey  :'',
            quality : [],
            color: 'green'
        };
    }

    componentDidMount(){
        this.setState({
            videoKey : this.props.videoKey,
            color: this.props.color ? this.props.color : this.state.color
        });
    }

    render (){
        if(this.props.videoKey && this.state.quality.length === 0){
            if(!this.state.error){
                this.getVideoDetails();
            }
            return (
              <Button loading={this.props.loading} disabled fluid>
                  Getting Video Information
              </Button>
            );
        }
        return (
            <div style={{
                display : 'flex',
                flexWrap : 'wrap'
            }}>
              {
                  this.state.quality.map((element, index) => {
                      return(
                        <Button
                            key={index}
                            color={this.props.color}
                            fluid
                            style={{
                                flex : '1 0 21%',
                                marginBottom : 5
                            }}
                            onClick={ () => {
                                this.downloadVideo(element.code);
                            } }>
                            <Icon name={ element.type === 'video' ? 'video' : 'music' } />
                            {
                                element.type === 'audio' ? element.extension.toUpperCase() + ' audio' : element.extension.toUpperCase() + ' (' + element.quality + ')'
                            }

                        </Button>
                      );
                  })
              }
              </div>
        );
    }

    getVideoDetails(){
        window.axios
        .get('/video-details/' + this.state.videoKey)
        .then( response => {
            try{
              return response.data;
            }catch(err){
                this.props.onChange({ 
                    error : true, 
                    message : 'Couldn\'t get the video details!', 
                    loading : false
                });
                this.setState({...this.state, error : true});
            }
        })
        .then(res => {
            if(res.status !== 'success'){
                this.props.onChange({
                    error : true,
                    message : res.message,
                    loading : false
                });
                this.setState({...this.state, error : true});
                return;
            }
            this.setState({ ...this.state, quality : res.video.quality });
            this.props.onChange({
                loading : false,
                error : false,
                message : 'The following qualities are available for download!'
            });
        })
        .catch(err => console.log(err));
    }

    downloadVideo(code){
        let url = window.location.href;
        const arr = url.split('/');
        const host = arr[0] + '//' + arr[2];
        window.open(host+'/download?videoKey='+this.state.videoKey+'&quality='+code);
    }

}