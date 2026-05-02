import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
    Tooltip,
    Typography,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from 'react-i18next';
import ClassifierMultiSelect from './ClassifierMultiSelect';
import TextFilter from './TextFilter';
import BooleanFilter from './BooleanFilter';
import DateRangeFilter from './DateRangeFilter';
import NumberRangeFilter from './NumberRangeFilter';

const renderFilter = (filter, value, onChange) => {
    switch (filter.kind) {
        case 'classifier':
            return <ClassifierMultiSelect filter={filter} value={value} onChange={onChange} />;
        case 'text':
            return <TextFilter filter={filter} value={value} onChange={onChange} />;
        case 'boolean':
            return <BooleanFilter filter={filter} value={value} onChange={onChange} />;
        case 'dateRange':
            return <DateRangeFilter filter={filter} value={value} onChange={onChange} />;
        case 'numberRange':
            return <NumberRangeFilter filter={filter} value={value} onChange={onChange} />;
        default:
            return null;
    }
};

const isFilterActive = (filter, value) => {
    if (value == null) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (filter.kind === 'dateRange') return Boolean(value.from || value.to);
    if (filter.kind === 'numberRange') return value.from != null || value.to != null;
    if (filter.kind === 'text') return value.trim().length > 0;
    return true;
};

const FilterGroup = ({ group, filters, defaultExpanded, onChangeFilter }) => {
    const { t } = useTranslation('common');

    const activeCount = group.filters
        .filter(f => isFilterActive(f, filters[f.urlKey]))
        .length;

    return (
        <Accordion
            disableGutters
            elevation={0}
            defaultExpanded={defaultExpanded || activeCount > 0}
            sx={{
                background: 'transparent',
                borderTop: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 0, minHeight: 44, '& .MuiAccordionSummary-content': { my: 1 } }}
            >
                <Stack direction='row' alignItems='center' spacing={1} sx={{ flex: 1 }}>
                    <Typography
                        variant='body2'
                        sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 11 }}
                    >
                        {t(group.titleKey)}
                    </Typography>
                    {activeCount > 0 && (
                        <Typography variant='caption' color='primary'>
                            ({activeCount})
                        </Typography>
                    )}
                    {group.tooltipKey && (
                        <Tooltip title={t(group.tooltipKey)} placement='top' arrow>
                            <IconButton
                                size='small'
                                onClick={(e) => e.stopPropagation()}
                                sx={{ ml: 'auto', mr: 1, p: 0.25, color: 'text.disabled' }}
                            >
                                <InfoOutlinedIcon fontSize='inherit' />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0 }}>
                <Stack spacing={1.5}>
                    {group.filters.map(filter => (
                        <div key={filter.urlKey}>
                            {renderFilter(filter, filters[filter.urlKey], (v) => onChangeFilter(filter.urlKey, v))}
                        </div>
                    ))}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default FilterGroup;
