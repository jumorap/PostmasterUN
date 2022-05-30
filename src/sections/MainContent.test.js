import {screen} from '@testing-library/react';
import { render } from 'react-dom/cjs/react-dom.production.min';
import MainContent from './MainContent';

render(MainContent)

screen.logTestingPlaygroundURL();