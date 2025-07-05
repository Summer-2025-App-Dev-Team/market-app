import styles from "../../assets/css/loadingmodal.module.css";

export default function LoadingModal() {
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.loadingModal}>
                <div className={styles.spinner}></div>
                <p className={styles.message}>Uploading...</p>
            </div>
        </div>
    );
}
