import React from 'react';

const DataCenterButton = ({ dataCenter, onClick }) => {
    return (
        <button className="data-center-button" onClick={() => onClick(dataCenter._id)}>
            {dataCenter.Libelle}
        </button>
    );
};

export default DataCenterButton;
