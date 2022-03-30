import { Component } from 'react';
import { PressableProps, ViewStyle, StyleProp, TextStyle, TextInput } from 'react-native';
import { InputProps } from '../Input';
import { SearchBarBaseProps } from './SearchBar';
export declare type SearchBarIosProps = typeof SearchBarIOS.defaultProps & InputProps & SearchBarBaseProps & {
    cancelButtonProps?: Partial<PressableProps> & {
        buttonStyle?: StyleProp<ViewStyle>;
        buttonTextStyle?: StyleProp<TextStyle>;
        color?: string;
        buttonDisabledStyle?: StyleProp<ViewStyle>;
        buttonDisabledTextStyle?: StyleProp<ViewStyle>;
    };
    cancelButtonTitle?: string;
    showCancel?: boolean;
};
declare type SearchBarState = {
    hasFocus: boolean;
    isEmpty: boolean;
    cancelButtonWidth: number | null;
};
export declare class SearchBarIOS extends Component<SearchBarIosProps, SearchBarState> {
    input: TextInput;
    static defaultProps: {
        value: string;
        cancelButtonTitle: string;
        loadingProps: {};
        cancelButtonProps: {};
        showLoading: boolean;
        onClear: () => any;
        onCancel: () => any;
        onFocus: () => any;
        onBlur: () => any;
        onChangeText: () => any;
        searchIcon: {
            name: string;
        };
        clearIcon: {
            name: string;
        };
        showCancel: boolean;
    };
    constructor(props: SearchBarIosProps);
    focus: () => void;
    blur: () => void;
    clear: () => void;
    cancel: () => void;
    onFocus: InputProps['onFocus'];
    onBlur: InputProps['onBlur'];
    onChangeText: (text: string) => void;
    render(): JSX.Element;
}
export {};
