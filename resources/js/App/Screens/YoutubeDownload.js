import React from 'react';
import {
    Segment,
    Grid,
    Input,
    Button,
    Icon
} from 'semantic-ui-react';

export default class YoutubeDownload extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            error : false,
            message : '',
            url : '',
            embeddable : false
        }
    }

    render() {
        return (
            <Segment vertical align={"center"}>
                <Grid centered columns={2}>
                    <Grid.Column id={"contentArea"}>
                        <Input fluid
                               autoFocus
                               placeholder={"Enter the video URL"}
                               action={ this.renderSearchButton() }
                               size={"large"}
                               style={{
                                   marginTop : '10vh',
                                   boxShadow : '2px 2px 5px #ccc',
                                   marginBottom : '14px'
                               }}
                               onChange={ (event, data) => {
                                   this.validateUrl(data.value);
                               }}
                        />
                        {
                            this.renderMessage()
                        }
                        {
                            this.state.url !== '' ? this.embedVideo() : ''
                        }
                    </Grid.Column>
                </Grid>
            </Segment>
        );

    };

    validateUrl(url = this.state.url) {
        if(!url){
            url = this.state.url;
        }
        if(url === undefined || url === '' ){
            this.setState({ ...this.state, error : false, embeddable : false, message : '' });
        }else{
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            if(match && match[2].length === 11){
                this.setState({ ...this.state, error : false, embeddable : true, url : url, message : '' })
            }else{
                this.setState({ ...this.state, error : true, embeddable : false, message : 'The URL entered is not a valid youtube URL!' });
            }
        }
    };

    renderSearchButton () {
        return (
            <Button color={this.getColor()}
                    disabled={ this.state.error }
                    loading={ this.state.loading }>
                <Icon name={"download"} />
            </Button>
        );
    };


    getColor () {
        if(this.state.error){
            return 'red';
        }
        return 'green';
    }

    embedVideo () {
        let url = this.state.url;
        url = url.replace('youtube.com/watch?v=','');
        url = url.replace('https://','');
        url = url.replace('www.','');
        let embedUrl = 'https://www.youtube.com/embed/'+url;
        if(this.state.embeddable){
            return (
                <iframe style={{ borderRadius : '5px', overflow : 'hidden', boxShadow : '2px 2px 5px #ccc' }} width={654 - 28} height={400} className={"ui fluid"} src={embedUrl} frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            );
        }
        return null;
    }

    renderMessage() {
        if(this.state.message.length > 0){
            return (
              <Segment inverted color={this.getColor()}>
                  {
                      this.state.message
                  }
              </Segment>
            );
        }
        return null;
    }
}