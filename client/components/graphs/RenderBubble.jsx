/**
 * ************************************
 *
 * @module  RenderBubbles
 * @author  samanthasalley
 * @date    2019-05-25
 * @description Renders prop data in nivo's responsive, circle-packing, bubble visualization
 *
 * ************************************
 */

import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';

const MyResponsiveBubble = ({ root, setColorBy, identity, value, generateTooltip, theme }) => (
    <ResponsiveBubble
        root={root}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        identity={identity || "name"}
        value={value || "size"}
        colors={{ scheme: 'paired' }}
        colorBy={setColorBy || 'name'}
        padding={5}
        labelTextColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
        borderWidth={2}
        defs={[
            {
                id: 'lines',
                type: 'patternLines',
                background: 'none',
                color: 'inherit',
                rotation: -45,
                lineWidth: 5,
                spacing: 8
            }
        ]}
        fill={[{ match: { depth: 1 }, id: 'lines' }]}
        animate={true}
        motionStiffness={90}
        motionDamping={12}
        tooltip={generateTooltip || null}
        theme={theme || null}
    />
);

export default MyResponsiveBubble;