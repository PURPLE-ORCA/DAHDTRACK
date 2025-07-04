import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import Delete from './Delete';
import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { TranslationContext } from '@/context/TranslationProvider';

function Data({ formations, onDeleted }) {
    const { translations } = useContext(TranslationContext);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{translations.formations.data.table_head_name}</TableHead>
                    <TableHead>{translations.formations.data.table_head_cours}</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {formations.map((formation) => (
                    <TableRow key={formation.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                            {formation.icon_name && <Icon icon={formation.icon_name} className="w-5 h-5" />}
                            {formation.name}
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="flex flex-wrap gap-2">
                                {formation.cours.map((e, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full bg-neutral-200 px-2 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                                    >
                                        # {e.name}
                                    </span>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="flex items-center justify-end gap-6">
                                <Link className="flex items-center gap-1" href={route('formations.edit', formation.id)}>
                                    <Pencil className="w-4" /> {translations.formations.data.edit_button}
                                </Link>
                                <Delete formation={formation} onDeleted={onDeleted} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default Data;
