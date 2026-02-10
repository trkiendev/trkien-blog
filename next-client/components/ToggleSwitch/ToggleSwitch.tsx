"use client";

import styles from './ToggleSwitch.module.css';

type ToggleSwitchProps = {
      checked: boolean;
      onChange: (value: boolean) => void;
      onLabel?: string;
      offLabel?: string;
}

export default function ToggleSwitch({
      checked,
      onChange,
      onLabel = "YES",
      offLabel = "NO"
}: ToggleSwitchProps) {
      return (
            <div className={styles.toggleButtonCover}>
                  <div className={`${styles.button} ${styles.buttonR} ${styles.toggle3}`}>
                        <input type="checkbox" className={styles.checkbox} />
                        <div className={styles.knobs} />
                        <div className={styles.layer} />
                  </div>
            </div>
      );
}