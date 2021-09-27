import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FooterTemplate from "./FooterTemplate";
import { FooterTemplateService } from '../../Service/FooterTemplateService'

import Loading from "../../Loading";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";

const EditFooterTemplate = () => {
    const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  
    const footerService = new FooterTemplateService()

  useEffect(() => {
    footerService.getAllFooterTemplates().then((res) => {
          const updatedData = res.data.find(data => data.id === id)
          setConfig(updatedData)
          setLoading(false)   
        })    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { id } = useParams()
  
    
     const breadcrumbs = [
        {
            label: "FooterTemplateDetails",
            path: "/templating/footerTemplate",
            icon: "fa fa-home",
            onlyIcon: false,
            showIcon: false,
        },
        {
            label: "Update",
            path: `/templating/footerTemplate/edit/`,
            icon: "fa fa-home",
            onlyIcon: false,
            showIcon: false,
        },
    ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? <Loading /> : <FooterTemplate edit={true} config={config} />}
    </>
  );
}

export default EditFooterTemplate
