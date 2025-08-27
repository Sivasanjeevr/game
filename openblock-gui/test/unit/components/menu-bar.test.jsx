import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers';
import MenuBar from '../../../src/components/menu-bar/menu-bar';
import {menuInitialState} from '../../../src/reducers/menus';
import {LoadingState} from '../../../src/reducers/project-state';

import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import VM from 'openblock-vm';


describe('MenuBar Component', () => {
    const store = configureStore()({
        locales: {
            isRtl: false,
            locale: 'en-US'
        },
        scratchGui: {
            menus: menuInitialState,
            projectState: {
                loadingState: LoadingState.NOT_LOADED
            },
            programMode: {
                isRealtimeMode: false
            },
            toolbox: {
                isToolboxUpdating: false
            },
            connectionModal: {
                realtimeConnection: false,
                peripheralName: null
            },
            stageSize: {
                stageSize: 'large'
            },
            device: {
                deviceId: null,
                deviceName: null
            },
            vm: new VM()
        }
    });

    const getComponent = function (props = {}) {
        const defaultProps = {
            isRealtimeMode: false,
            onShowMessageBox: () => {},
            ...props
        };
        return <Provider store={store}><MenuBar {...defaultProps} /></Provider>;
    };  

    test('menu bar with no About handler has no About button', () => {
        const menuBar = mountWithIntl(getComponent());
        const button = menuBar.find('AboutButton');
        expect(button.exists()).toBe(false);
    });

    test('menu bar with an About handler has an About button', () => {
        const onClickAbout = jest.fn();
        const menuBar = mountWithIntl(getComponent({onClickAbout}));
        const button = menuBar.find('AboutButton');
        expect(button.exists()).toBe(true);
    });

    test('clicking on About button calls the handler', () => {
        const onClickAbout = jest.fn();
        const menuBar = mountWithIntl(getComponent({onClickAbout}));
        const button = menuBar.find('AboutButton');
        expect(onClickAbout).toHaveBeenCalledTimes(0);
        button.simulate('click');
        expect(onClickAbout).toHaveBeenCalledTimes(1);
    });

    test('Edit menu is hidden when canShowEdit is false', () => {
        const menuBar = mountWithIntl(getComponent({canShowEdit: false}));
        const editMenu = menuBar.findWhere(node => node.text() === 'Edit');
        expect(editMenu.exists()).toBe(false);
    });

    test('Edit menu is shown when canShowEdit is true', () => {
        const menuBar = mountWithIntl(getComponent({canShowEdit: true}));
        const editMenu = menuBar.findWhere(node => node.text() === 'Edit');
        expect(editMenu.exists()).toBe(true);
    });
});
