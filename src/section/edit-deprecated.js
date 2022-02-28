/**
 * BLOCK: section-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

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
	console.log( 'EDIT DEPRECATED', props );
	const {
		attributes,
		setAttributes,
		setBackgroundColor,
	} = props;

	const { cssClassName, customBackgroundColor, customTextColor } = attributes;

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
				{sectionCssClasses && sectionCssClasses.length &&
					<SelectControl
						label="Classname"
						value={cssClassName}
						options={sectionCssClasses}
						onChange={(cssClassName) => {
							setAttributes({cssClassName});
						}}
					/>
				}
			</InspectorAdvancedControls>
			<section
				className={ props.className + ' ' + cssClassName }
				style={ {
					backgroundColor: customBackgroundColor,
					color: customTextColor,
				} }
			>
				<InnerBlocks />
			</section>
		</Fragment>
	);
};
