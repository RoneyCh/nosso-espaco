import { render, screen } from '@testing-library/react';
import { SideBarNav } from './SideBarNav';
import { useContext } from 'react'

jest.mock('next/router', () => ({   
    useRouter() {
        return {
            asPath: '/',
        };
    }
}));


describe('SideBarNav', () => {
    it('renders correctly', () => {
        render(<SideBarNav />);
    
        expect(screen.getByText('Geral')).toBeInTheDocument();
    });

    it('renders correctyle when logged in', () => {
        render(<SideBarNav />);
        
        expect(screen.getByText('Sair')).toBeInTheDocument();
    });
    

})