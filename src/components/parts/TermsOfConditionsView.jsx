import React, { Component } from "react"
import uuid from "uuid"
import InnerHTML from "dangerously-set-inner-html"

const clickwrapCode = (clientUserId) => `
<div id="ds-clickwrap"></div>
<script>docuSignClick.Clickwrap.render({
environment: 'https://demo.docusign.net',
accountId: '285963de-04f6-4029-bfb1-8b0967a2feac',
clickwrapId: 'dda48aec-1487-4555-9357-3a203618ad60',
clientUserId: '${clientUserId}'
}, '#ds-clickwrap');</script>
`

class TermsOfConditionsView extends Component {
  render() {
    return <InnerHTML html={clickwrapCode(uuid.v4())}/>
  }
}

export default TermsOfConditionsView