import React, {
    Component,
} from 'react';
import PropTypes from 'prop-types';
const {ViewPropTypes} = ReactNative = require('react-native');
import {
    StyleSheet,
    PixelRatio,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';

var {
    width,
    height
} = Dimensions.get('window');


class FlowView extends Component {

    static propTypes = {
        backgroundColors: PropTypes.array,
        textColors: PropTypes.array,
        text: PropTypes.string,
        isSelected: PropTypes.bool,
        onClick: PropTypes.func,
    }
    static defaultProps = {
        backgroundColors: ['#F5F5F5', '#F5F5F5'],
        textColors: ['#333', '#333'],
        isSelected: false,
    }

    constructor(props) {
        super(props);

        this.state = {
            isSelected: this.props.isSelected,
        };
    }

    setSelected(bool) {
        this.setState({
            isSelected: bool
        })
    }

    _backgoundColor() {
        if (this.state.isSelected) {
            return this.props.backgroundColors[1];
        } else {
            return this.props.backgroundColors[0];
        }
    }

    _textColor() {
        if (this.state.isSelected) {
            return this.props.textColors[1];
        } else {
            return this.props.textColors[0];
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>{
                    this.props.onClick();
                    this.setState({isSelected:!this.state.isSelected});
                }}>
                    <View style={[styles.corner,{backgroundColor:this._backgoundColor()}]}>
                        <Text style={[styles.text,{color:this._textColor()}]}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

}
export default class FlowLayout extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        dataValue: PropTypes.array,
        multiselect: PropTypes.bool,
        reflectValue: PropTypes.func
    }
    static defaultProps = {
        style: {},
        dataValue: ["标签1", "标签2", "标签3标签4标签4", "标签4", "标签5", "标签5标签6", "标签7", "标签8", "标签9", "标签10标签8"],
        multiselect: true,
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedState: new Array(this.props.dataValue.length).fill(false),
        };

    }

    change() {
        for (var i = 0; i < this.state.selectedState.length; i++) {
            let item = this.refs[this.props.dataValue[i]];
            if (item) {
                item.setSelected(this.state.selectedState[i]);
            }
        }
    }

    resetData() {
        this.setState({
            selectedState: new Array(this.props.dataValue.length).fill(false),
        }, () => {
            this.change();
        })
    }

    render() {
        let items = this.props.dataValue.map((value, position) => {
            return (
                <View key={position}>
                    <FlowView ref={this.props.dataValue[position]} text={value} onClick={()=>{
                        this.props.reflectValue(value)
                    }}/>
                </View>
            );
        });

        return (
            <View style={[styles.container,this.props.style]}>
                {items}
            </View>
        );
    };
}
const styles = StyleSheet.create({
    corner: {
        borderColor: '#D0D0D0',
        borderWidth: 1 / PixelRatio.get(),
        borderRadius: 15,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        marginTop: 10,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: width,
    },

});