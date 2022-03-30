import { Component } from 'react';
import { TextInput, EmitterSubscription } from 'react-native';
import { InputProps } from '../Input';
import { IconNode } from '../Icon';
import { SearchBarBaseProps } from './SearchBar';
export declare type SearchBarAndroidProps = InputProps & SearchBarBaseProps & {
    cancelIcon?: IconNode;
};
declare type SearchBarState = {
    hasFocus: boolean;
    isEmpty: boolean;
};
export declare class SearchBarAndroid extends Component<SearchBarAndroidProps, SearchBarState> {
    input: TextInput;
    static defaultProps: {
        onClear: () => any;
        onCancel: () => any;
        onFocus: () => any;
        onBlur: () => any;
        onChangeText: () => any;
    };
    keyboardListener: EmitterSubscription;
    focus: () => void;
    blur: () => void;
    clear: () => void;
    cancel: () => void;
    onFocus: InputProps['onFocus'];
    onBlur: InputProps['onBlur'];
    onChangeText: (text: string) => void;
    constructor(props: SearchBarAndroidProps);
    _keyboardDidHide: () => void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
