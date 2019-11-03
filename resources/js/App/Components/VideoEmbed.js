import React from 'react';


export default class VideoEmbed extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            videoKey : props.videoKey ? props.videoKey : ''
        }
    }

    render(){
        if(this.state.videoKey === ''){
            return;
        }

        let videoKey = 'https://www.youtube.com/embed/'+this.state.videoKey;
        return(
            <div className={"media_embed"}>

                <iframe
                    style={
                        {
                            borderRadius : '5px',
                            overflow : 'hidden',
                            boxShadow : '2px 2px 5px #ccc'
                        }
                    }
                    width={654 - 28}
                    height={400}
                    src = {videoKey}
                    frameBorder = "0"
                    allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />
            </div>
        );
    }

}