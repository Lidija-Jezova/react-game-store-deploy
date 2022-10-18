import React from "react"
import ContentLoader from "react-content-loader"
import styles from './CardSkeleton.module.scss'

const CardSkeleton: React.FC = (props) => (
    <ContentLoader
        className={styles.skeleton}
        speed={2}
        height={247}
        viewBox="0 0 385 247"
        backgroundColor="#575e6b"
        foregroundColor="#393E46"
        {...props}
    >
        <rect x="0" y="0" rx="16" ry="16" width="385" height="221"/>
        <rect x="325" y="227" rx="8" ry="8" width="60" height="19"/>
        <rect x="0" y="227" rx="8" ry="8" width="200" height="20"/>
    </ContentLoader>
)

export default CardSkeleton

