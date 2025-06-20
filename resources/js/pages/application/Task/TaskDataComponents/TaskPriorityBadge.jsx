import { Badge } from '@/components/ui/badge';
import { useContext } from 'react';
import { TranslationContext } from '@/context/TranslationProvider';

export const getPriorityConfig = (priority) => {
    const configs = {
        low: {
            variant: 'outline',
            color: 'text-black dark:text-white',
            badgeClass: '',
        },
        medium: {
            variant: 'default',
            color: 'text-white',
            badgeClass: '',
        },
        high: {
            variant: 'default',
            color: 'text-white',
            badgeClass: '',
        },
    };
    return configs[priority] || configs.low;
};

export default function TaskPriorityBadge({ priority }) {
    const { translations } = useContext(TranslationContext);
    const config = getPriorityConfig(priority);

    return (
        <Badge
            className={`dark:text-neutral-200 shrink-0 rounded-full bg-neutral-200 px-2 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 ${config.badgeClass}`}
        >
            {translations.tasks.priority[priority]}
        </Badge>
    );
}
