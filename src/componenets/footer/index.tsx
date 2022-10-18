import React from 'react';
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            Project by Lidija Jezova, {new Date().getFullYear().toString()}
        </footer>
    );
};

export default Footer;