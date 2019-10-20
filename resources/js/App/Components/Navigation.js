import React from "react";
import {Menu, Button, Icon } from "semantic-ui-react";
import {Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import MyDownloads from '../Screens/MyDownloads';
import YoutubeDownload from '../Screens/YoutubeDownload';

export default class Navigation extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Router>
                    <Menu style={{ borderRadius : 0, marginBottom : 0 }}>
                        <Menu.Item>
                            <Link to="/">
                                <Button inverted color={"green"}>
                                    <Icon name={"home"} />
                                </Button>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/my-downloads">
                                <Button color={"blue"} inverted>
                                        Downloads
                                </Button>
                            </Link>
                        </Menu.Item>
                    </Menu>

                    <Switch>
                        <Route path="/my-downloads">
                            <MyDownloads/>
                        </Route>
                        <Route path="/">
                            <YoutubeDownload/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }

}