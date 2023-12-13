import React, { Fragment } from "react";

import AppFooter from "../../Layout/AppFooter/";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import FormClipboard from "./Components/Clipboard/";
import FormColorPicker from "./Components/ColorPicker/";
import FormDatePicker from "./Components/DatePicker/";
import FormDropZone from "./Components/DropZone/";
import FormDropdown from "./Components/Dropdown/";
import FormElementsControls from "./Elements/Controls/";
import FormElementsLayouts from "./Elements/Layouts/";
import FormElementsSticky from "./Elements/StickyHeaders/";
import FormElementsValidation from "./Elements/Validation/";
import FormInputMask from "./Components/InputMask/";
import FormMultiSelect from "./Components/MultiSelect/";
import FormRangeSlider from "./Components/RangeSlider/";
import FormTextareaAutosize from "./Components/TextareaAutosize/";
import FormToggleSwitch from "./Components/ToggleSwitch/";
import FormTypeahead from "./Components/Typeahead/";
import FormWizardVar1 from "./Elements/Wizard/Examples/Variation1";
import FormWizardVar2 from "./Elements/Wizard/Examples/Variation2";
import FormWizardVar3 from "./Elements/Wizard/Examples/Variation3";
import FormWysiwygEditor from "./Components/WysiwygEditor/";
import FormsNumberPickerExamples from "./Components/NumberPicker/";
import { Route } from "react-router-dom";
import ThemeOptions from "../../Layout/ThemeOptions/";

// Forms





// Layout


// Theme Options


const Forms = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          {/* Form Elements */}

          <Route path={`${match.url}/general`} component={FormElementsControls}/>
          <Route path={`${match.url}/layouts`} component={FormElementsLayouts}/>
          <Route path={`${match.url}/validation`} component={FormElementsValidation}/>
          <Route path={`${match.url}/wizard-1`} component={FormWizardVar1} />
          <Route path={`${match.url}/wizard-2`} component={FormWizardVar2} />
          <Route path={`${match.url}/wizard-3`} component={FormWizardVar3} />
          <Route path={`${match.url}/sticky-headers`} component={FormElementsSticky}/>

          {/* Form Components */}

          <Route path={`${match.url}/datepicker`} component={FormDatePicker} />
          <Route path={`${match.url}/toggle-switch`} component={FormToggleSwitch}/>
          <Route path={`${match.url}/range-slider`} component={FormRangeSlider}/>
          <Route path={`${match.url}/wysiwyg-editor`} component={FormWysiwygEditor}/>
          <Route path={`${match.url}/input-selects`} component={FormMultiSelect}/>
          <Route path={`${match.url}/dropdown`} component={FormDropdown} />
          <Route path={`${match.url}/input-mask`} component={FormInputMask} />
          <Route path={`${match.url}/dropzone`} component={FormDropZone} />
          <Route path={`${match.url}/typeahead`} component={FormTypeahead} />
          <Route path={`${match.url}/clipboard`} component={FormClipboard} />
          <Route path={`${match.url}/textarea-autosize`} component={FormTextareaAutosize}/>
          <Route path={`${match.url}/numberspinners`} component={FormsNumberPickerExamples}/>
          <Route path={`${match.url}/color-picker`} component={FormColorPicker}/>
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Forms;
