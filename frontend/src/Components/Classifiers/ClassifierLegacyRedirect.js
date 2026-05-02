import React from 'react';
import {
    Navigate,
    Routes,
    Route,
    useParams,
    useLocation
} from 'react-router-dom';

const ClassifierTypeIdRedirect = () => {
    const { classifier, id } = useParams();
    return <Navigate to={`/otsi/viisid?${classifier}=${id}`} replace />;
};

const PassthroughRedirect = () => {
    const { pathname, search } = useLocation();
    const target = pathname.replace(/^\/klassifikaatorid/, '/halda/klassifikaatorid');
    return <Navigate to={target + search} replace />;
};

const ClassifierLegacyRedirect = () => (
    <Routes>
        <Route path="/:classifier/:id/vaata" element={<ClassifierTypeIdRedirect />} />
        <Route path="*" element={<PassthroughRedirect />} />
    </Routes>
);

export default ClassifierLegacyRedirect;
