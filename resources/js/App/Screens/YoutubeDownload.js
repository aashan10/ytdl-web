import React from 'react';
import {
    Segment,
    Grid
} from 'semantic-ui-react';
import DownloadButtons from '../Components/DownloadButtons';
import SearchField from '../Components/SearchField';
import VideoEmbed from '../Components/VideoEmbed';

export default class YoutubeDownload extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            error : false,
            message : '',
            videoKey : '',
            loading : false
        }
    }

    render() {
        return (
            <Segment vertical align={"center"}>
                <Grid centered columns={2}>
                    <Grid.Column id={"contentArea"}>
                        <SearchField
                            onChange={ (state) => {
                                this.setState({...this.state, ...state});
                            }}
                            color={this.getColor()}
                            disabled={this.state.error}
                            loading={this.state.loading }
                            videoKey={this.state.videoKey}
                        />
                        {
                            this.renderMessage()
                        }
                        {
                           this.state.videoKey ? this.renderDownload() :''

                        }

                        {
                            this.state.videoKey ? this.renderEmbed() :''
                        }

                    </Grid.Column>
                </Grid>
            </Segment>
        );

    };

    renderDownload(){
        return (
            <DownloadButtons
                videoKey={this.state.videoKey}
                color={this.getColor()}
                onChange={(state) => {
                    this.setState({...this.state, ...state});
                }}
                loading={this.state.loading}
            />
        )
    }

    renderEmbed(){
        return <VideoEmbed videoKey={this.state.videoKey}/>;
    }

    getColor () {
        if(this.state.error){
            return 'red';
        }
        return 'green';
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