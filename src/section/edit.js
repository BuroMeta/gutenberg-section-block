/**
 * BLOCK: section-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
import Section from './section-tag';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	SelectControl,
} = wp.components;
const { Fragment } = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	PanelColorSettings,
} = wp.blockEditor;

// this var is defined in wp_add_inline_script in init.php
// eslint-disable-next-line no-undef
if (sectionCssClasses && sectionCssClasses.length !== 0) {
	sectionCssClasses = [
		{label: '- geen -', value: ''},
		...sectionCssClasses,
	];
}

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		setBackgroundColor,
	} = props;

	const { tagName, cssClassName, customBackgroundColor, customTextColor } = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelColorSettings
					initialOpen={ false }
					title={ __( 'Colors' ) }
					colorSettings={ [
						{
							label: __( 'Background Color' ),
							value: customBackgroundColor,
							onChange: ( nextBgColor, ...whatelse ) => {
								setBackgroundColor( nextBgColor );
								setAttributes(
									{
										customBackgroundColor: nextBgColor,
									}
								);
							},
						},
						{
							label: __( 'Text Color' ),
							value: customTextColor,
							onChange: ( nextColor, ...whatelse ) => {
								setAttributes(
									{
										customTextColor: nextColor,
									}
								);
							},
						},
					] }
				/>
			</InspectorControls>
			<InspectorAdvancedControls>
				{ sectionCssClasses && sectionCssClasses.length &&
					<SelectControl
						label="Classname"
						value={ cssClassName }
						options={ sectionCssClasses }
						onChange={ ( cssClassName ) => {
							setAttributes( { cssClassName } );
						} }
					/>
				// ) : (
				// 	<p><strong>Missing option for cssClassName!</strong> Create an ACF option named 'section_classes' of type 'Repeater'. Add two sub fields 'label' and 'value' to it. Then fill it with the classes you need.</p>
				}
			</InspectorAdvancedControls>
			<Section
				tagName={ tagName }
				className={ props.className + ' ' + cssClassName }
				style={ {
					backgroundColor: customBackgroundColor,
					color: customTextColor,
				} }
			>
				<InnerBlocks />
			</Section>
		</Fragment>
	);
};
