import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export function PageWrapper({ children }: { children: React.ReactNode }) {
    
    const { lang } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    return children
}
